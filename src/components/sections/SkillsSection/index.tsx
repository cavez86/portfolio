import { getLocalizedCollection } from '@/components/utils/db';

import SkillsSectionView from './SkillsSectionView';
import { Suspense } from 'react';

const SkillsSection = () => {
  const skillsPromise = getLocalizedCollection('skills');
  const softSkillsPromise = getLocalizedCollection('soft-skills');

  return (
    <Suspense>
      <SkillsSectionView skills={skillsPromise} softSkills={softSkillsPromise} />
    </Suspense>
  );
};

export default SkillsSection;
