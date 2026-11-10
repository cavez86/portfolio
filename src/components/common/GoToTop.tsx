'use client';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

export const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 300);
  });

  const scrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          animate={{ opacity: 1, scale: 1 }}
          aria-label="Scroll to top"
          className="bg-inchiostro text-carta hover:bg-cobalto fixed right-4 bottom-4 flex size-12 cursor-pointer items-center justify-center rounded-full border-2 border-carta transition-colors hover:text-white md:right-8 md:bottom-8"
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          transition={{ duration: 0.2 }}
          type="button"
          whileHover={{ scale: 1.08 }}
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
