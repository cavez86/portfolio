import type { PointerEvent } from 'react';

import { type Bob, type CradleParams, energy, isAtRest, MAX_THETA, period, stepChain, tensionOverMass } from './cradle';

const G = 9.81;
/** Scale of the drawing: one square of the notebook stands for 5 cm. */
const METRES_PER_SQUARE = 0.05;
export const RELEASE_DEG = 24;
export const RELEASE_THETA = (-RELEASE_DEG * Math.PI) / 180;

/** An angle in degrees with one decimal and a true minus sign, never “−0.0”. */
export const formatDegrees = (radians: number) => {
  const degrees = (radians * 180) / Math.PI;
  return Math.abs(degrees) < 0.05 ? '0.0' : degrees.toFixed(1).replace('-', '\u2212');
};
const PARAMS: Omit<CradleParams, 'omega0Sq'> = { damping: 0.4, maxTheta: MAX_THETA, restitution: 0.96 };
const RELEASE_DELAY_MS = 1100;
/** After the visitor lets go, the diagram follows whichever letter carries the swing. */
const FOLLOW_AFTER_MS = 1200;
/** Multiflash exposure of where the string meets the followed letter: a dot every 60 ms, the last dozen kept. */
const FLASH_MS = 60;
const FLASHES = 12;

export interface Controller {
  pointerDown(event: PointerEvent<HTMLElement>): void;
  pointerMove(event: PointerEvent<HTMLElement>): void;
  pointerUp(event: PointerEvent<HTMLElement>): void;
  pointerLeave(): void;
  release(): void;
  dispose(): void;
}

interface Pivot {
  x: number;
  y: number;
  /** Pivot to the centre of the letter. */
  radius: number;
  /** Pivot to the centre of the ring on the glyph, and to just below the glyph. */
  top: number;
  foot: number;
}

/** Baseline and descender depth below the top of a letter's box, in em (Bricolage at line-height 0.8). */
const BASELINE = 0.73;
const DESCENDER = 0.172;
/** Gap kept between a drawn mark and the glyph it belongs to, in em. */
const CLEARANCE = 0.03;

interface Pointer {
  x: number;
  y: number;
  t: number;
  vx: number;
  vy: number;
}

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

const arrow = (x1: number, y1: number, x2: number, y2: number, head: number) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const wing = (side: number) => {
    const a = angle + Math.PI + side * 0.45;
    return `${x2 + head * Math.cos(a)},${y2 + head * Math.sin(a)}`;
  };
  return `M${x1},${y1}L${x2},${y2}M${wing(-1)}L${x2},${y2}L${wing(1)}`;
};

/**
 * Drives the server-rendered letters of a `.cradle` heading: measures them at rest, runs the
 * simulation while something moves and the heading is on screen, and draws the free-body diagram
 * of the letter last touched, or of the one carrying the swing. Under reduced motion it only draws
 * the still diagram.
 */
export const mountCradle = ({
  heading,
  overlay,
  readout,
  subscript,
  onMeasure,
}: {
  heading: HTMLElement;
  overlay: SVGSVGElement;
  readout: HTMLElement;
  subscript: HTMLElement;
  onMeasure: (value: { length: number; period: number }) => void;
}): Controller => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wordEls = [...heading.querySelectorAll<HTMLElement>('.cradle-word')];
  const bobEls = [...heading.querySelectorAll<HTMLElement>('.cradle-bob')];
  const chains: Bob[][] = wordEls.map((word) =>
    [...word.querySelectorAll('.cradle-bob')].map(() => ({ omega: 0, theta: 0 }))
  );
  const bobs = chains.flat();
  const parts = new Map([...overlay.querySelectorAll<SVGElement>('[data-part]')].map((el) => [el.dataset.part, el]));

  let pivots: Pivot[] = [];
  let lengthMetres = 0.4;
  let fontSize = 100;
  let active = 0;
  let touched = -Infinity;
  let flashes: { x: number; y: number; index: number }[] = [];
  let lastFlash = 0;
  let pointer: Pointer | null = null;
  let grab: { index: number; pointerId: number; moved: boolean } | null = null;
  let frame = 0;
  let last = 0;
  let visible = true;
  let released = false;

  const pose = () => {
    for (const bob of bobs) {
      bob.theta = 0;
      bob.omega = 0;
    }
    if (bobs[0]) bobs[0].theta = RELEASE_THETA;
    active = 0;
  };
  pose();

  const measure = () => {
    const grid = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid')) || 20;
    fontSize = Number.parseFloat(getComputedStyle(heading).fontSize);
    pivots = bobEls.map((el) => {
      const word = el.parentElement as HTMLElement;
      const style = getComputedStyle(el);
      // offset* ignore transforms, so these are the rest positions even mid-swing.
      const string = el.offsetTop;
      const attach = Number.parseFloat(style.getPropertyValue('--attach')) * fontSize;
      const ring = Number.parseFloat(style.getPropertyValue('--ring')) * fontSize;
      const descends = /[gjpqy]/.test(el.textContent ?? '');
      return {
        foot: string + (BASELINE + (descends ? DESCENDER : 0) + CLEARANCE) * fontSize,
        radius: string + el.offsetHeight / 2,
        top: string + attach - ring / 2,
        x: word.offsetLeft + el.offsetLeft + el.offsetWidth / 2,
        y: word.offsetTop,
      };
    });
    lengthMetres = ((pivots[0]?.radius ?? grid) / grid) * METRES_PER_SQUARE;
    overlay.style.fontSize = `${Math.min(34, Math.max(18, fontSize * 0.2))}px`;
    onMeasure({ length: lengthMetres * 100, period: period(lengthMetres, G) });
  };

  const set = (part: string, attrs: Record<string, string | number>) => {
    const el = parts.get(part);
    if (el) for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
  };

  const paint = () => {
    bobs.forEach((bob, i) => {
      bobEls[i]?.style.setProperty('--theta', `${bob.theta}rad`);
    });

    const bob = bobs[active];
    const pivot = pivots[active];
    if (!bob || !pivot) return;
    const shown = bob.held || Math.abs(bob.theta) > 0.035 || Math.abs(bob.omega) > 0.2;
    overlay.style.opacity = shown ? '1' : '0';

    const { x: px, y: py } = pivot;
    const sin = Math.sin(bob.theta);
    const cos = Math.cos(bob.theta);
    const tx = px + pivot.top * sin;
    const ty = py + pivot.top * cos;
    // The weight is drawn from just under the glyph so it never crosses a letter.
    const fx = px + pivot.foot * sin;
    const fy = py + pivot.foot * cos;
    const unit = fontSize * 0.24;
    const head = Math.max(9, fontSize * 0.07);
    const label = fontSize * 0.08;

    const now = performance.now();
    if (now - lastFlash > FLASH_MS) {
      lastFlash = now;
      flashes = [...flashes.filter((dot) => dot.index === active), { index: active, x: tx, y: ty }].slice(-FLASHES);
    }
    const r = Math.max(3, fontSize * 0.025);
    set('flashes', {
      d: flashes.map((dot) => `M${dot.x - r},${dot.y}a${r},${r} 0 1 0 ${2 * r},0a${r},${r} 0 1 0 ${-2 * r},0`).join(''),
    });

    // Tension along the string, from the ring towards the beam (never past it).
    const tension = Math.min(pivot.top * 0.85, (tensionOverMass(bob, G, lengthMetres) / G) * unit * 1.4);
    const side = bob.theta < 0 ? 1 : -1;
    set('tension', { d: arrow(tx, ty, tx - tension * sin, ty - tension * cos, head) });
    set('tension-label', {
      x: tx - tension * sin + side * label - (side < 0 ? label : 0),
      y: ty - tension * cos + label * 2,
    });
    set('weight', { d: arrow(fx, fy, fx, fy + unit, head) });
    set('weight-label', { x: fx + label, y: fy + unit });

    // θ from the vertical, its swept area in highlighter.
    const arcR = pivot.top * 0.62;
    const ax = px + arcR * sin;
    const ay = py + arcR * cos;
    const sweep = bob.theta < 0 ? 1 : 0;
    set('vertical', { x1: px, x2: px, y1: py, y2: py + pivot.top });
    set('arc', { d: `M${px},${py + arcR}A${arcR},${arcR} 0 0 ${sweep} ${ax},${ay}` });
    set('wedge', { d: `M${px},${py}L${px},${py + arcR}A${arcR},${arcR} 0 0 ${sweep} ${ax},${ay}Z` });
    const half = bob.theta / 2;
    set('theta', {
      'text-anchor': bob.theta < 0 ? 'end' : 'start',
      x: px + (arcR + label) * Math.sin(half) - side * label * 0.4,
      y: py + (arcR + label) * Math.cos(half),
    });

    const force =
      pointer &&
      (grab
        ? { x1: tx, x2: pointer.x, y1: ty, y2: pointer.y }
        : Math.hypot(pointer.vx, pointer.vy) > 60 && {
            x1: pointer.x - clamp(pointer.vx * 0.06, unit),
            x2: pointer.x,
            y1: pointer.y - clamp(pointer.vy * 0.06, unit),
            y2: pointer.y,
          });
    const hasF = force && Math.hypot(force.x2 - force.x1, force.y2 - force.y1) > 6;
    set('force', { d: hasF ? arrow(force.x1, force.y1, force.x2, force.y2, head) : '' });
    set('force-label', { opacity: hasF ? 1 : 0, x: hasF ? force.x2 + 8 : 0, y: hasF ? force.y2 - 8 : 0 });

    readout.textContent = formatDegrees(bob.theta);
    subscript.textContent = bobEls[active]?.textContent ?? '';
  };

  const tick = (time: number) => {
    const dt = Math.min(1 / 30, last ? (time - last) / 1000 : 1 / 60);
    last = time;
    const omega0Sq = G / lengthMetres;
    for (const chain of chains) stepChain(chain, dt, { ...PARAMS, omega0Sq });
    if (!grab && time - touched > FOLLOW_AFTER_MS) {
      const swing = bobs.map((bob) => energy([bob], omega0Sq));
      const strongest = swing.indexOf(Math.max(...swing));
      if (swing[strongest] > 1.5 * swing[active]) active = strongest;
    }
    if (pointer && !grab) {
      pointer.vx *= 0.8;
      pointer.vy *= 0.8;
    }
    paint();
    if (visible && (grab || !isAtRest(chains))) {
      frame = requestAnimationFrame(tick);
    } else {
      frame = 0;
      last = 0;
    }
  };

  const start = () => {
    if (reducedMotion.matches || !released || !visible || frame) return;
    frame = requestAnimationFrame(tick);
  };

  const local = (event: PointerEvent) => {
    const rect = heading.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const track = (event: PointerEvent) => {
    const { x, y } = local(event);
    const dt = pointer ? Math.max(4, event.timeStamp - pointer.t) / 1000 : 1;
    pointer = {
      t: event.timeStamp,
      vx: pointer ? (x - pointer.x) / dt : 0,
      vy: pointer ? (y - pointer.y) / dt : 0,
      x,
      y,
    };
    return pointer;
  };

  const interactive = () => !reducedMotion.matches && pivots.length > 0;

  measure();
  paint();

  const resize = new ResizeObserver(() => {
    measure();
    paint();
  });
  resize.observe(heading);

  const onScreen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    start();
  });
  onScreen.observe(heading);

  // The one orchestrated moment of the page: the first letter is let go.
  const releaseTimer = window.setTimeout(() => {
    released = true;
    start();
  }, RELEASE_DELAY_MS);

  const onMotionChange = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    pose();
    paint();
    released = !reducedMotion.matches;
    start();
  };
  reducedMotion.addEventListener('change', onMotionChange);

  return {
    dispose() {
      cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      resize.disconnect();
      onScreen.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
    },

    pointerDown(event) {
      if (!interactive()) return;
      const target = (event.target as HTMLElement).closest<HTMLElement>('.cradle-bob');
      const index = target ? bobEls.indexOf(target) : -1;
      if (index < 0) return;
      track(event);
      event.currentTarget.setPointerCapture(event.pointerId);
      grab = { index, moved: false, pointerId: event.pointerId };
      active = index;
      touched = event.timeStamp;
      bobs[index].held = true;
      released = true;
      start();
    },

    pointerLeave() {
      if (!grab) pointer = null;
    },

    pointerMove(event) {
      if (!interactive()) return;
      const p = track(event);

      if (grab) {
        if (grab.pointerId !== event.pointerId) return;
        const pivot = pivots[grab.index];
        const bob = bobs[grab.index];
        const theta = clamp(Math.atan2(p.x - pivot.x, p.y - pivot.y), MAX_THETA);
        bob.omega = 0.6 * bob.omega + 0.4 * ((theta - bob.theta) * 60);
        bob.theta = theta;
        grab.moved = true;
        return;
      }

      if (event.pointerType !== 'mouse') return;
      // Brushing past a letter pushes it along the pointer's motion, tangentially to its swing.
      let pushed = false;
      pivots.forEach((pivot, i) => {
        const bob = bobs[i];
        const cx = pivot.x + pivot.radius * Math.sin(bob.theta);
        const cy = pivot.y + pivot.radius * Math.cos(bob.theta);
        if (Math.hypot(p.x - cx, p.y - cy) > fontSize * 0.45) return;
        const tangential = p.vx * Math.cos(bob.theta) - p.vy * Math.sin(bob.theta);
        const delta = clamp((tangential / pivot.radius) * 0.08, 3.5);
        if (Math.abs(delta) < 0.05) return;
        bob.omega += delta;
        active = i;
        touched = event.timeStamp;
        pushed = true;
      });
      if (pushed) {
        released = true;
        start();
      }
    },

    pointerUp(event) {
      if (!grab || grab.pointerId !== event.pointerId) return;
      const bob = bobs[grab.index];
      bob.held = false;
      if (!grab.moved) {
        // A tap pushes the letter away from the side it was touched on.
        bob.omega += local(event).x < pivots[grab.index].x ? 3.2 : -3.2;
      }
      bob.omega = clamp(bob.omega, 9);
      grab = null;
      touched = event.timeStamp;
      start();
    },

    release() {
      if (!bobs[0]) return;
      bobs[0].theta = RELEASE_THETA;
      bobs[0].omega = 0;
      active = 0;
      released = true;
      paint();
      start();
    },
  };
};
