'use client';

import { type PointerEvent, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { type BeadParams, beadString, stepBeads } from './beads';

const PARAMS: BeadParams = { damping: 1.5, maxY: 22, stiffness: 160 };
const PLUCK = 420;

interface Controller {
  pluck(index: number, direction: number): void;
  strum(event: PointerEvent<HTMLElement>): void;
  forget(): void;
}

/**
 * One group of skills drawn as masses threaded on a string fixed at both ends. The string is
 * horizontal on wide screens and vertical in the phone grid; it vibrates transversely when plucked.
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
  const lineRef = useRef<SVGPolylineElement>(null);
  const controller = useRef<Controller | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const list = track.querySelector('ul');
    const masses = [...track.querySelectorAll<HTMLElement>('[data-mass]')];
    const state = beadString(masses.length);
    let frame = 0;
    let last = 0;
    let vertical = false;
    let along: number[] = [];
    let size = { across: 0, length: 0 };
    let lastSide = 0;

    const measure = () => {
      vertical = !!list && getComputedStyle(list).flexDirection === 'column';
      along = masses.map((el) => (vertical ? el.offsetTop + el.offsetHeight / 2 : el.offsetLeft + el.offsetWidth / 2));
      size = vertical
        ? { across: track.clientWidth, length: track.clientHeight }
        : { across: track.clientHeight, length: track.clientWidth };
    };

    const paint = () => {
      const mid = size.across / 2;
      const point = (a: number, offset: number) => (vertical ? `${mid + offset},${a}` : `${a},${mid + offset}`);
      line.setAttribute(
        'points',
        [point(0, 0), ...along.map((a, i) => point(a, state.y[i])), point(size.length, 0)].join(' ')
      );
      masses.forEach((el, i) => {
        el.style.transform = vertical ? `translateX(${state.y[i]}px)` : `translateY(${state.y[i]}px)`;
      });
    };

    const tick = (time: number) => {
      const dt = Math.min(1 / 30, last ? (time - last) / 1000 : 1 / 60);
      last = time;
      const resting = stepBeads(state, dt, PARAMS);
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
      if (reducedMotion.matches || index < 0 || index >= masses.length) return;
      if (!frame) {
        measure();
        track.setAttribute('data-moving', '');
        frame = requestAnimationFrame(tick);
      }
      state.v[index] += (direction >= 0 ? 1 : -1) * PLUCK;
    };

    controller.current = {
      forget() {
        lastSide = 0;
      },
      pluck,
      // Passing the pointer across the string plucks it at the nearest mass, in the pointer's direction.
      strum(event) {
        const rect = track.getBoundingClientRect();
        const across = vertical ? event.clientX - rect.left : event.clientY - rect.top;
        const position = vertical ? event.clientY - rect.top : event.clientX - rect.left;
        if (!frame) measure();
        const side = Math.sign(across - size.across / 2);
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
    <div className={cn('bead-string', soft && 'bead-string-soft')}>
      <h4 className="bead-name">
        <button
          aria-describedby={hintId}
          className="highlight cursor-pointer text-left hover:highlight-on focus-visible:highlight-on"
          onClick={() => controller.current?.pluck(0, 1)}
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
          <polyline fill="none" ref={lineRef} strokeLinejoin="round" />
        </svg>
        <ul>
          {skills.map((skill, i) => (
            <li
              className="bead-mass"
              data-mass
              key={skill}
              onPointerDown={(event) => {
                if (event.pointerType !== 'mouse') controller.current?.pluck(i, 1);
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
