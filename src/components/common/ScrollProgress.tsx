'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { type RefObject, useEffect, useState } from 'react';

/**
 * Scroll progress as a tram: it rides the line from the terminus (the current job) down to the last stop
 * while the timeline scrolls through the middle of the viewport. Needs a positioned parent that holds an
 * `ol` of stops and defines `--rail-x`, the horizontal position of the line.
 */
const ScrollProgress = ({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) => {
  const reduceMotion = useReducedMotion();
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({ offset: ['start 0.5', 'end 0.5'], target: targetRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, travel]);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const measure = () => {
      const lastStop = element.querySelector('ol')?.lastElementChild;
      if (lastStop instanceof HTMLElement) {
        setTravel(lastStop.offsetTop);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [targetRef]);

  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute top-3.5 left-(--rail-x) -mt-[18px] -ml-2 z-10"
      focusable="false"
      height="36"
      style={{ y: reduceMotion ? 0 : y }}
      viewBox="0 0 16 36"
      width="16"
    >
      <rect fill="#ff6350" height="34" rx="3" stroke="#1c1420" strokeWidth="2" width="14" x="1" y="1" />
      <rect fill="#1c1420" height="6" rx="1" width="10" x="3" y="6" />
      <rect fill="#1c1420" height="6" rx="1" width="10" x="3" y="16" />
      <circle cx="5" cy="31" fill="#f4ab3d" r="1.6" />
      <circle cx="11" cy="31" fill="#f4ab3d" r="1.6" />
    </motion.svg>
  );
};

export default ScrollProgress;
