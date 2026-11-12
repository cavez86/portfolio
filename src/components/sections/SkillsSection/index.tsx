import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import SkillsSectionView from './SkillsSectionView';

const SkillsSection = () => (
  <Suspense fallback={<SectionSkeleton rows={3} />}>
    <SkillsSectionView />
  </Suspense>
);

export default SkillsSection;
