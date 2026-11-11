'use client';

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * The scroll-progress indicator: a tram rides the line from the terminus (the current job) down to the first job
 * while the line scrolls through the middle of the viewport. Pointing at or focusing a stop calls the tram there.
 * With reduced motion it does not follow the scroll, and a called tram jumps instead of gliding.
 */
const TramLine = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tramRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [start, setStart] = useState(0);
  const track = useRef({ first: 0, length: 0 });
  const calledTo = useRef<number | null>(null);
  const target = useMotionValue(0);
  const glide = useSpring(target, { damping: 20, stiffness: 90 });
  const { scrollYProgress } = useScroll({ offset: ['start 0.5', 'end 0.5'], target: ref });

  const follow = (progress: number) => {
    if (calledTo.current === null && !reduceMotion) target.set(progress * track.current.length);
  };
  useMotionValueEvent(scrollYProgress, 'change', follow);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      const top = element.getBoundingClientRect().top;
      const markers = [...element.querySelectorAll('[data-stop-marker]')].map((marker) => {
        const box = marker.getBoundingClientRect();
        return box.top + box.height / 2 - top;
      });
      if (markers.length === 0) return;
      // The tram waits just past the terminus and stops just before the last stop, so no stop is hidden.
      const gap = tramRef.current?.getBoundingClientRect().height ?? 0;
      track.current = { first: markers[0], length: Math.max(Math.max(...markers) - markers[0] - gap * 2, 0) };
      setStart(markers[0] + gap);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const call = (event: Event) => {
      const marker = (event.target as Element).closest('.line-row')?.querySelector('[data-stop-marker]');
      if (!marker) return;
      const box = marker.getBoundingClientRect();
      calledTo.current = box.top + box.height / 2 - element.getBoundingClientRect().top - track.current.first;
      target.set(calledTo.current);
    };
    const release = () => {
      calledTo.current = null;
      target.set(reduceMotion ? 0 : scrollYProgress.get() * track.current.length);
    };

    const listeners = [
      ['pointerover', call],
      ['focusin', call],
      ['pointerleave', release],
      ['focusout', release],
    ] as const;
    for (const [type, listener] of listeners) element.addEventListener(type, listener);
    return () => {
      for (const [type, listener] of listeners) element.removeEventListener(type, listener);
    };
  }, [reduceMotion, scrollYProgress, target]);

  return (
    <div className="relative" ref={ref}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-(--rail-x) z-10 h-[calc(var(--rail-w)*7)] w-[calc(var(--rail-w)*2.8)] -translate-1/2"
        ref={tramRef}
        style={{ top: start, y: reduceMotion ? target : glide }}
      >
        <svg aria-hidden="true" className="size-full" focusable="false" viewBox="0 0 28 70">
          {/* A tram seen from above: a cab at each end, the roof between them, the pantograph in the middle. */}
          <rect className="fill-carta stroke-notte" height="66" rx="9" strokeWidth="2.5" width="24" x="2" y="2" />
          <path
            className="fill-tram"
            d="M5,13V11a6,6 0 0 1 6-6h6a6,6 0 0 1 6,6v2ZM5,57v2a6,6 0 0 0 6,6h6a6,6 0 0 0 6-6v-2Z"
          />
          <path className="stroke-notte" d="M9,30L19,40M19,30L9,40" fill="none" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  );
};

export default TramLine;
