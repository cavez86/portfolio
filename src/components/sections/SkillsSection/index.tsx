import { Suspense } from 'react';

import { SkillsSectionSkeleton } from '@/components/sections/SectionSkeleton';

import SkillsSectionView from './SkillsSectionView';

const SkillsSection = () => {
  return (
    <Suspense fallback={<SkillsSectionSkeleton />}>
      <SkillsSectionView />
    </Suspense>
  );
};

export default SkillsSection;
