import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import EducationSectionView from './EducationSectionView';

const EducationSection = async () => {
  const t = await getTranslations('Education');
  return (
    <Suspense fallback={<SectionSkeleton id="education" lines={2} title={t('title')} />}>
      <EducationSectionView />
    </Suspense>
  );
};

export default EducationSection;
