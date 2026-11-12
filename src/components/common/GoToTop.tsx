'use client';

import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export const GoToTop = () => {
  const t = useTranslations('Common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => setIsVisible(window.scrollY > 600);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      aria-label={t('to_top')}
      className="fixed right-4 bottom-4 z-30 inline-flex size-12 cursor-pointer items-center justify-center rounded-sm border-2 border-ink bg-paper text-ink hover:bg-quadretti md:right-6 md:bottom-6"
      onClick={() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ behavior: reducedMotion ? 'auto' : 'smooth', top: 0 });
      }}
      type="button"
    >
      <ArrowUp aria-hidden="true" className="size-6" strokeWidth={2.5} />
    </button>
  );
};
