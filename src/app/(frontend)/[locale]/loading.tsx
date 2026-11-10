'use client';

import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Loading');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <p aria-live="polite" className="font-display animate-pulse text-3xl italic" role="status">
        {t('loading')}
      </p>
    </div>
  );
}
