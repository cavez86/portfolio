import { Suspense } from 'react';

import { LanguagesSectionSkeleton } from '@/components/sections/SectionSkeleton';

import LanguagesSectionView from './LanguagesSectionView';

const LanguagesSection = () => {
  return (
    <Suspense fallback={<LanguagesSectionSkeleton />}>
      <LanguagesSectionView />
    </Suspense>
  );
};

export default LanguagesSection;
