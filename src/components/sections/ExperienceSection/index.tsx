import { Suspense } from 'react';

import { ExperienceSectionSkeleton } from '@/components/sections/SectionSkeleton';

import ExperienceSectionView from './ExperienceSectionView';

const ExperienceSection = () => {
  return (
    <Suspense fallback={<ExperienceSectionSkeleton />}>
      <ExperienceSectionView />
    </Suspense>
  );
};

export default ExperienceSection;
