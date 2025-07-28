import { Suspense } from 'react';

import { getLocalizedCollection } from '@/components/utils/db';

import LanguagesSectionView from './LanguagesSectionView';

const LanguagesSection = () => {
  const languagesPromise = getLocalizedCollection('languages');

  return (
    <Suspense>
      <LanguagesSectionView languages={languagesPromise} />
    </Suspense>
  );
};

export default LanguagesSection;
