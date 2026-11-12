import { getTranslations } from 'next-intl/server';

import { HeroSkeleton, SectionSkeleton } from '@/components/sections/SectionSkeleton';

export default async function Loading() {
  const t = await getTranslations('Loading');

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <p className="sr-only" role="status">
        {t('loading')}
      </p>
      <HeroSkeleton />
      <div className="max-w-[46rem]">
        <SectionSkeleton rows={4} />
      </div>
    </main>
  );
}
