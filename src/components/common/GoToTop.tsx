'use client';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const GoToTop = () => {
  const t = useTranslations('Common');
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 600);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          animate={{ opacity: 1 }}
          aria-label={t('to_top')}
          className="fixed right-4 bottom-4 z-30 inline-flex size-12 cursor-pointer items-center justify-center rounded-sm border-2 border-ink bg-paper text-ink transition-colors hover:bg-highlighter md:right-6 md:bottom-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => window.scrollTo({ behavior: reducedMotion ? 'auto' : 'smooth', top: 0 })}
          transition={{ duration: 0.15 }}
        >
          <ArrowUp aria-hidden="true" className="size-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
