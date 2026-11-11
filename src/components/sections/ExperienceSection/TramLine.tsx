'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * The scroll-progress indicator: a tram rides the line from the terminus (the current job) down to the first job
 * while the line scrolls through the middle of the viewport. With reduced motion it stays parked at the terminus.
 */
const TramLine = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tramRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [track, setTrack] = useState({ length: 0, start: 0 });
  const { scrollYProgress } = useScroll({ offset: ['start 0.5', 'end 0.5'], target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, track.length]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      const top = element.getBoundingClientRect().top;
      const markers = [...element.querySelectorAll('[data-stop-marker]')].map((marker) => {
        const box = marker.getBoundingClientRect();
        return box.top + box.height / 2 - top;
      });
      // The tram waits just past the terminus and stops just before the last stop, so no stop is hidden.
      const gap = tramRef.current?.getBoundingClientRect().height ?? 0;
      if (markers.length > 0) {
        setTrack({ length: Math.max(Math.max(...markers) - markers[0] - gap * 2, 0), start: markers[0] + gap });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative" ref={ref}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-(--rail-x) z-10 h-[calc(var(--rail-w)*7)] w-[calc(var(--rail-w)*2.8)] -translate-1/2"
        ref={tramRef}
        style={{ top: track.start, y: reduceMotion ? 0 : y }}
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
