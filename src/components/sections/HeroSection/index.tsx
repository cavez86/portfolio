import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import HeroSectionView from './HeroSectionView';
import { Suspense } from 'react';

const HeroSection = () => {
  const personalInfoPromise = getLocalizedGlobal('personal-info');
  const summaryInfoPromise = getLocalizedCollection('summary-info');

  return (
    <Suspense>
      <HeroSectionView personalInfo={personalInfoPromise} summaryInfo={summaryInfoPromise} />
    </Suspense>
  );
};

export default HeroSection;
