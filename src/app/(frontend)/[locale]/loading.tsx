'use client';

import { useTranslations } from 'next-intl';

// Three primitives take turns: circle, bar, dot. Static when reduced motion is on.
export default function Loading() {
  const t = useTranslations('Loading');

  return (
    <div aria-live="polite" className="flex min-h-[60vh] flex-col items-center justify-center gap-5" role="status">
      <div aria-hidden="true" className="flex items-center gap-2">
        <span className="bg-cobalto block size-8 animate-bounce rounded-full motion-reduce:animate-none" />
        <span className="bg-pomodoro block h-4 w-8 animate-bounce rounded-full [animation-delay:150ms] motion-reduce:animate-none" />
        <span className="bg-girasole border-inchiostro block size-4 animate-bounce rounded-full border-2 [animation-delay:300ms] motion-reduce:animate-none" />
      </div>
      <p className="type-small">{t('loading')}</p>
    </div>
  );
}
