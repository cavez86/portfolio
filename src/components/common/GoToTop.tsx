'use client';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Disc } from './Disc';

export const GoToTop = () => {
  const t = useTranslations('Header');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 300);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          animate={{ opacity: 1, scale: 1 }}
          aria-label={t('top')}
          className="group/top fixed right-4 bottom-4 cursor-pointer rounded-full md:right-8 md:bottom-8"
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
          transition={{ duration: 0.2 }}
          type="button"
        >
          <Disc className="border-carta size-14 border-[3px] group-hover/top:rotate-360">
            <ArrowUp className="size-6" strokeWidth={2.75} />
          </Disc>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
