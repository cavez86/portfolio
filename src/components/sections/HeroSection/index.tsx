import { Suspense } from 'react';

import { HeroSkeleton } from '@/components/sections/SectionSkeleton';

import HeroSectionView from './HeroSectionView';

const HeroSection = () => (
  <Suspense fallback={<HeroSkeleton />}>
    <HeroSectionView />
  </Suspense>
);

export default HeroSection;
