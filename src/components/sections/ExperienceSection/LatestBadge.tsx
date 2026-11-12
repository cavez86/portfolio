import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/utils';

/** The one place the "release" green is used: marking the newest release. */
export const LatestBadge = async ({ className }: { className?: string }) => {
  const t = await getTranslations('Experience');

  return (
    <span
      className={cn(
        'rounded-full border border-latest/40 bg-latest-tint px-2.5 py-0.5 text-sm leading-normal font-medium text-latest',
        className
      )}
    >
      {t('latest')}
    </span>
  );
};
