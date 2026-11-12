import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import ExperienceSectionView from './ExperienceSectionView';

const ExperienceSection = () => (
  <Suspense fallback={<SectionSkeleton rows={4} />}>
    <ExperienceSectionView />
  </Suspense>
);

export default ExperienceSection;
