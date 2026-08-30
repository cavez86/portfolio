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
          className="bg-primary text-primary-foreground hover:bg-primary/80 fixed right-4 bottom-4 cursor-pointer rounded-full p-2 shadow-lg"
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
