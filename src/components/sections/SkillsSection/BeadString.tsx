'use client';

import { type CSSProperties, type PointerEvent, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { type BeadParams, beadString, pluckProfile, smoothPath, stepBeads } from './beads';

const PARAMS: BeadParams = { damping: 1.1, maxY: 26, stiffness: 150 };
/** A hanging string swings less, so its names stay clear of the next column. */
const HANGING: BeadParams = { ...PARAMS, maxY: 14 };
const PLUCK = 460;

interface Controller {
  pluck(index: number, direction: number): void;
  strum(event: PointerEvent<HTMLElement>): void;
  forget(): void;
}

/**
 * One group of skills: equal masses (beads) on a string fixed at both ends, the name of each skill set
 * beside its bead. Horizontal on wide pages, hanging vertically on narrow ones. A pluck sets up a
 * standing wave whose envelope is drawn, on the side away from the names, while it rings.
 */
export function BeadString({
  name,
  skills,
  ink,
  soft = false,
  hintId,
}: {
  name: string;
  skills: string[];
  /** CSS colour of this string's pencil. */
  ink: string;
  soft?: boolean;
  /** Id of the element that explains what pressing a group's name does. */
  hintId: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const envelopeRef = useRef<SVGPathElement>(null);
  const controller = useRef<Controller | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    const envelope = envelopeRef.current;
    if (!track || !line || !envelope) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const items = [...track.querySelectorAll<HTMLElement>('[data-mass]')];
    const beads = items.map((item) => item.querySelector<HTMLElement>('.bead') as HTMLElement);
    const state = beadString(items.length);
    let frame = 0;
    let last = 0;
    let vertical = false;
    let along: number[] = [];
    let across = 0;
    let length = 0;
    let lastSide = 0;

    const measure = () => {
      vertical = getComputedStyle(track).getPropertyValue('--vertical').trim() === '1';
      // offset* ignore transforms, so these are the rest positions.
      const centre = (bead: HTMLElement, item: HTMLElement) => ({
        x: item.offsetLeft + bead.offsetLeft + bead.offsetWidth / 2,
        y: item.offsetTop + bead.offsetTop + bead.offsetHeight / 2,
      });
      const centres = beads.map((bead, i) => centre(bead, items[i]));
      along = centres.map((c) => (vertical ? c.y : c.x));
      across = vertical ? (centres[0]?.x ?? 0) : (centres[0]?.y ?? 0);
      length = vertical ? track.clientHeight : track.clientWidth;
    };

    const point = (a: number, offset: number) =>
      vertical ? ([across + offset, a] as const) : ([a, across + offset] as const);

    const paint = () => {
      line.setAttribute('d', smoothPath([point(0, 0), ...along.map((a, i) => point(a, state.y[i])), point(length, 0)]));
      const amplitude = Math.max(...state.y.map(Math.abs));
      const samples = Array.from({ length: 25 }, (_, k) => (k / 24) * length);
      // The envelope is drawn on the side away from the names (below, or left of a hanging string).
      const away = vertical ? -1 : 1;
      const edge = smoothPath(samples.map((a) => point(a, away * amplitude * Math.sin((Math.PI * a) / length))));
      envelope.setAttribute('d', amplitude > 1 ? edge : '');
      items.forEach((el, i) => {
        el.style.transform = vertical ? `translateX(${state.y[i]}px)` : `translateY(${state.y[i]}px)`;
      });
    };

    const tick = (time: number) => {
      const dt = Math.min(1 / 30, last ? (time - last) / 1000 : 1 / 60);
      last = time;
      const resting = stepBeads(state, dt, vertical ? HANGING : PARAMS);
      paint();
      if (resting) {
        frame = 0;
        last = 0;
        track.removeAttribute('data-moving');
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const pluck = (index: number, direction: number) => {
      if (reducedMotion.matches || index < 0 || index >= items.length) return;
      if (!frame) {
        measure();
        track.setAttribute('data-moving', '');
        frame = requestAnimationFrame(tick);
      }
      const profile = pluckProfile(items.length, index);
      profile.forEach((share, i) => {
        state.v[i] += (direction >= 0 ? 1 : -1) * PLUCK * share * (vertical ? 0.55 : 1);
      });
    };

    controller.current = {
      forget() {
        lastSide = 0;
      },
      pluck,
      // Passing the pointer across the string plucks it at the nearest bead, in the pointer's direction.
      strum(event) {
        if (!frame) measure();
        const rect = track.getBoundingClientRect();
        const crossing = vertical ? event.clientX - rect.left : event.clientY - rect.top;
        const position = vertical ? event.clientY - rect.top : event.clientX - rect.left;
        const side = Math.sign(crossing - across);
        if (lastSide !== 0 && side !== 0 && side !== lastSide) {
          const nearest = along.reduce(
            (best, a, i) => (Math.abs(a - position) < Math.abs(along[best] - position) ? i : best),
            0
          );
          pluck(nearest, side);
        }
        if (side !== 0) lastSide = side;
      },
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      controller.current = null;
    };
  }, []);

  return (
    <div className={cn('bead-string', soft && 'bead-string-soft')} style={{ '--string-ink': ink } as CSSProperties}>
      <h4 className="bead-name">
        <button
          aria-describedby={hintId}
          className="highlight cursor-pointer text-left hover:highlight-on focus-visible:highlight-on"
          onClick={() => controller.current?.pluck(Math.floor((skills.length - 1) / 2), 1)}
          type="button"
        >
          {name}
        </button>
      </h4>
      <div
        className="bead-track"
        onPointerLeave={() => controller.current?.forget()}
        onPointerMove={(event) => controller.current?.strum(event)}
        ref={trackRef}
      >
        <span aria-hidden="true" className="bead-rest" />
        <svg aria-hidden="true" className="bead-line">
          <path className="bead-envelope" fill="none" ref={envelopeRef} />
          <path fill="none" ref={lineRef} />
        </svg>
        <ul>
          {skills.map((skill, i) => (
            <li
              className="bead-mass"
              data-mass
              key={skill}
              onPointerDown={(event) => controller.current?.pluck(i, event.pointerType === 'mouse' ? -1 : 1)}
            >
              <span aria-hidden="true" className="bead" />
              <span className="bead-label">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
