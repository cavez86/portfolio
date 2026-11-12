import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import BackgroundSectionView from './BackgroundSectionView';

const BackgroundSection = () => (
  <Suspense fallback={<SectionSkeleton rows={2} />}>
    <BackgroundSectionView />
  </Suspense>
);

export default BackgroundSection;
