import { Suspense } from 'react';

import { HeroSectionSkeleton } from '@/components/sections/SectionSkeleton';

import HeroSectionView from './HeroSectionView';

const HeroSection = () => {
  return (
    <Suspense fallback={<HeroSectionSkeleton />}>
      <HeroSectionView />
    </Suspense>
  );
};

export default HeroSection;
