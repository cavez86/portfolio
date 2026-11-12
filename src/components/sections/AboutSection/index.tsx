import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import AboutSectionView from './AboutSectionView';

const AboutSection = () => (
  <Suspense fallback={<SectionSkeleton rows={2} />}>
    <AboutSectionView />
  </Suspense>
);

export default AboutSection;
