import { getTranslations } from 'next-intl/server';

import { HeroSectionSkeleton } from '@/components/sections/SectionSkeleton';

export default async function Loading() {
  const t = await getTranslations('Loading');

  return (
    <main id="main">
      <p className="sr-only" role="status">
        {t('loading')}
      </p>
      <HeroSectionSkeleton />
    </main>
  );
}
