import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import SkillsSectionView from './SkillsSectionView';

const SkillsSection = async () => {
  const t = await getTranslations('Skills');
  return (
    <Suspense fallback={<SectionSkeleton id="skills" lines={6} title={t('title')} />}>
      <SkillsSectionView />
    </Suspense>
  );
};

export default SkillsSection;
