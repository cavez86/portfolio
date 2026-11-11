'use client';

import { type MotionValue, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { type RefObject, useEffect } from 'react';

// Degrees the page's main shaft turns per pixel scrolled. Every drawn piece is driven from this one
// shaft, so the whole page turns as one machine.
const DEGREES_PER_PIXEL = 0.12;

// Whether the visitor asked for reduced motion, as a motion value that starts false on the server and
// in the first client render (so hydration matches) and is corrected right after mount.
const useStill = () => {
  const reduced = useReducedMotion();
  const still = useMotionValue(false);
  useEffect(() => still.set(Boolean(reduced)), [reduced, still]);
  return still;
};

// The shaft angle in degrees, still under reduced motion.
export const useDrive = (): MotionValue<number> => {
  const still = useStill();
  const { scrollY } = useScroll();
  return useTransform(() => (still.get() ? 0 : scrollY.get() * DEGREES_PER_PIXEL));
};

// 0 while the element's top is below the viewport, 1 once it has risen to 35% from the top.
// Pieces use it to put themselves together as they arrive; under reduced motion they are already there.
export const useArrival = (target: RefObject<HTMLElement | null>): MotionValue<number> => {
  const still = useStill();
  const { scrollYProgress } = useScroll({ offset: ['start end', 'start 0.35'], target });
  return useTransform(() => (still.get() ? 1 : scrollYProgress.get()));
};
