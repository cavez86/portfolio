'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { type BeadParams, beadString, pluckProfile, smoothPath, stepBeads } from './beads';

/** Damped so a pluck rings for about a second. */
const PARAMS: BeadParams = { damping: 4.5, maxY: 14, stiffness: 150 };
/** A hanging string swings less, so its names stay clear of the next column. */
const HANGING: BeadParams = { ...PARAMS, maxY: 8 };
const PLUCK = 300;

/**
 * One group of skills: the names, each over an equal mass (bead) on a quiet string fixed at both ends.
 * Horizontal on wide pages, hanging vertically on narrow ones. It moves only when plucked: a click, tap
 * or Enter on the group's name or on a skill.
 */
export function BeadString({
  name,
  skills,
  soft = false,
  hintId,
}: {
  name: string;
  skills: string[];
  soft?: boolean;
  /** Id of the element that explains what pressing a group's name does. */
  hintId: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const pluckRef = useRef<((index: number) => void) | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;
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

    pluckRef.current = (index: number) => {
      if (reducedMotion.matches || index < 0 || index >= items.length) return;
      if (!frame) {
        measure();
        track.setAttribute('data-moving', '');
        frame = requestAnimationFrame(tick);
      }
      const profile = pluckProfile(items.length, index);
      profile.forEach((share, i) => {
        state.v[i] += PLUCK * share * (vertical ? 0.55 : 1);
      });
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      pluckRef.current = null;
    };
  }, []);

  return (
    <div className={cn('bead-string', soft && 'bead-string-soft')}>
      <h4 className="bead-name">
        <button
          aria-describedby={hintId}
          className="cursor-pointer text-left hover:underline hover:decoration-dotted hover:underline-offset-4"
          onClick={() => pluckRef.current?.(Math.floor((skills.length - 1) / 2))}
          type="button"
        >
          {name}
        </button>
      </h4>
      <div className="bead-track" ref={trackRef}>
        <span aria-hidden="true" className="bead-rest" />
        <svg aria-hidden="true" className="bead-line">
          <path fill="none" ref={lineRef} />
        </svg>
        <ul>
          {skills.map((skill, i) => (
            <li className="bead-mass" data-mass key={skill} onPointerUp={() => pluckRef.current?.(i)}>
              <span aria-hidden="true" className="bead" />
              <span className="bead-label">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
