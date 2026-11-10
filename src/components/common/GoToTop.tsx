'use client';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const GoToTop = () => {
  const t = useTranslations('Common');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 600);
  });

  const scrollToTop = () => {
    window.scrollTo({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      top: 0,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          animate={{ opacity: 1, y: 0 }}
          aria-label={t('back_to_top')}
          className="bg-carta text-savoia hover:bg-foschia fixed right-4 bottom-4 z-40 flex size-11 cursor-pointer items-center justify-center rounded-sm transition-colors md:right-8 md:bottom-8"
          exit={{ opacity: 0, y: 8 }}
          initial={{ opacity: 0, y: 8 }}
          onClick={scrollToTop}
          transition={{ duration: 0.2 }}
          type="button"
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
