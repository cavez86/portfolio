import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import AboutSectionView from './AboutSectionView';

const AboutSection = async () => {
  const t = await getTranslations('About');
  return (
    <Suspense fallback={<SectionSkeleton id="about" lines={5} title={t('title')} />}>
      <AboutSectionView />
    </Suspense>
  );
};

export default AboutSection;
