import type { PointerEvent } from 'react';

import { type Bob, type CradleParams, energy, isAtRest, MAX_THETA, stepChain, tensionOverMass } from './cradle';

const G = 9.81;
/** Scale of the drawing: one square of the notebook stands for 5 cm. */
const METRES_PER_SQUARE = 0.05;
export const RELEASE_DEG = 20;
const RELEASE_THETA = (-RELEASE_DEG * Math.PI) / 180;
/** Damped enough that a swing settles in a few seconds. */
const PARAMS: Omit<CradleParams, 'omega0Sq'> = { damping: 1.6, maxTheta: MAX_THETA, restitution: 0.9 };
/** After the visitor lets go, the diagram follows whichever letter carries the swing. */
const FOLLOW_AFTER_MS = 1200;

export interface Controller {
  pointerDown(event: PointerEvent<HTMLElement>): void;
  pointerMove(event: PointerEvent<HTMLElement>): void;
  pointerUp(event: PointerEvent<HTMLElement>): void;
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
  /** Radius of the ring. */
  ring: number;
  foot: number;
  /** Half the letter's width. */
  half: number;
}

/** Baseline and descender depth below the top of a letter's box, in em (Bricolage at line-height 0.8). */
const BASELINE = 0.73;
const DESCENDER = 0.172;
/** Gap kept between a drawn mark and the glyph it belongs to, in em. */
const CLEARANCE = 0.03;

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
 * Drives the server-rendered letters of a `.cradle` heading. The name hangs still until the visitor
 * drags or taps a letter (or presses release); then the simulation runs while something moves and the
 * heading is on screen, with the free-body diagram of the letter last touched, or of the one carrying
 * the swing. Under reduced motion nothing moves.
 */
export const mountCradle = ({ heading, overlay }: { heading: HTMLElement; overlay: SVGSVGElement }): Controller => {
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
  let grab: { index: number; pointerId: number; moved: boolean } | null = null;
  let frame = 0;
  let last = 0;
  let visible = true;

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
        half: el.offsetWidth / 2,
        radius: string + el.offsetHeight / 2,
        ring: ring / 2,
        top: string + attach - ring / 2,
        x: word.offsetLeft + el.offsetLeft + el.offsetWidth / 2,
        y: word.offsetTop,
      };
    });
    lengthMetres = ((pivots[0]?.radius ?? grid) / grid) * METRES_PER_SQUARE;
    overlay.style.fontSize = `${Math.min(30, Math.max(16, fontSize * 0.17))}px`;
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
    // The weight is drawn from just under the lowest corner of the turned glyph, so it never crosses it.
    const fx = px + pivot.foot * sin;
    const fy = py + pivot.foot * cos + pivot.half * Math.abs(sin);
    const unit = fontSize * 0.24;
    const head = Math.max(9, fontSize * 0.07);
    const label = fontSize * 0.08;

    // θ from the vertical, its label just outside the arc.
    const arcR = pivot.top * 0.4;
    const ax = px + arcR * sin;
    const ay = py + arcR * cos;
    const sweep = bob.theta < 0 ? 1 : 0;
    const side = bob.theta < 0 ? 1 : -1;
    set('vertical', { x1: px, x2: px, y1: py, y2: py + pivot.top });
    set('arc', { d: `M${px},${py + arcR}A${arcR},${arcR} 0 0 ${sweep} ${ax},${ay}` });
    set('theta', { 'text-anchor': side > 0 ? 'start' : 'end', x: px + side * label * 0.6, y: py + arcR + label * 0.9 });

    // Tension along the string, from just above the ring towards the pivot, stopping short of the angle.
    const start = pivot.top - pivot.ring - CLEARANCE * fontSize;
    const sx = px + start * sin;
    const sy = py + start * cos;
    const tension = Math.min(start - arcR - label, (tensionOverMass(bob, G, lengthMetres) / G) * unit * 1.4);
    set('tension', { d: arrow(sx, sy, sx - tension * sin, sy - tension * cos, head) });
    // Its label sits beside the arrow, on the side away from the vertical.
    const away = bob.theta < 0 ? -1 : 1;
    const midT = { x: sx - (tension / 2) * sin, y: sy - (tension / 2) * cos };
    set('tension-label', {
      'text-anchor': away < 0 ? 'end' : 'start',
      x: midT.x + away * cos * label * 1.2,
      y: midT.y - away * sin * label * 1.2 + label * 0.8,
    });
    set('weight', { d: arrow(fx, fy, fx, fy + unit, head) });
    set('weight-label', { x: fx + label * 0.8, y: fy + unit * 0.8 });
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
    paint();
    if (visible && (grab || !isAtRest(chains))) {
      frame = requestAnimationFrame(tick);
    } else {
      frame = 0;
      last = 0;
    }
  };

  const start = () => {
    if (reducedMotion.matches || !visible || frame) return;
    frame = requestAnimationFrame(tick);
  };

  const local = (event: PointerEvent) => {
    const rect = heading.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
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

  // Turning reduced motion on stops the cradle where it hangs at rest.
  const onMotionChange = () => {
    if (!reducedMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = 0;
    grab = null;
    for (const bob of bobs) {
      bob.theta = 0;
      bob.omega = 0;
      bob.held = false;
    }
    paint();
  };
  reducedMotion.addEventListener('change', onMotionChange);

  return {
    dispose() {
      cancelAnimationFrame(frame);
      resize.disconnect();
      onScreen.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
    },

    pointerDown(event) {
      if (!interactive()) return;
      const target = (event.target as HTMLElement).closest<HTMLElement>('.cradle-bob');
      const index = target ? bobEls.indexOf(target) : -1;
      if (index < 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      grab = { index, moved: false, pointerId: event.pointerId };
      active = index;
      touched = event.timeStamp;
      bobs[index].held = true;
      start();
    },

    pointerMove(event) {
      if (!interactive() || !grab || grab.pointerId !== event.pointerId) return;
      const p = local(event);
      const pivot = pivots[grab.index];
      const bob = bobs[grab.index];
      const theta = clamp(Math.atan2(p.x - pivot.x, p.y - pivot.y), MAX_THETA);
      bob.omega = 0.6 * bob.omega + 0.4 * ((theta - bob.theta) * 60);
      bob.theta = theta;
      grab.moved = true;
    },

    pointerUp(event) {
      if (!grab || grab.pointerId !== event.pointerId) return;
      const bob = bobs[grab.index];
      bob.held = false;
      if (!grab.moved) {
        // A tap pushes the letter away from the side it was touched on.
        bob.omega += local(event).x < pivots[grab.index].x ? 3.2 : -3.2;
      }
      bob.omega = clamp(bob.omega, 6);
      grab = null;
      touched = event.timeStamp;
      start();
    },

    release() {
      if (!bobs[0] || !interactive()) return;
      bobs[0].theta = RELEASE_THETA;
      bobs[0].omega = 0;
      active = 0;
      touched = performance.now();
      paint();
      start();
    },
  };
};
