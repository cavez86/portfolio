import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import ExperienceSectionView from './ExperienceSectionView';

const ExperienceSection = async () => {
  const t = await getTranslations('Experience');
  return (
    <Suspense fallback={<SectionSkeleton id="experience" lines={8} title={t('title')} />}>
      <ExperienceSectionView />
    </Suspense>
  );
};

export default ExperienceSection;
