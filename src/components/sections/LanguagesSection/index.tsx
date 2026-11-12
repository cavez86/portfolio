import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import LanguagesSectionView from './LanguagesSectionView';

const LanguagesSection = async () => {
  const t = await getTranslations('Languages');
  return (
    <Suspense fallback={<SectionSkeleton id="languages" lines={2} title={t('title')} />}>
      <LanguagesSectionView />
    </Suspense>
  );
};

export default LanguagesSection;
