'use client';

import { motion, useScroll } from 'motion/react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="bg-primary fixed top-0 left-0 z-60 h-1 w-full origin-top-left ease-in-out"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
