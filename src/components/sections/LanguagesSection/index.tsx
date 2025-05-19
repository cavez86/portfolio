import { getLocalizedCollection } from '@/components/utils/db';

import LanguagesSectionView from './LanguagesSectionView';
import { Suspense } from 'react';

const LanguagesSection = () => {
  const languagesPromise = getLocalizedCollection('languages');

  return (
    <Suspense>
      <LanguagesSectionView languages={languagesPromise} />
    </Suspense>
  );
};

export default LanguagesSection;
