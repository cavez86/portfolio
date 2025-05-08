import { getLocalizedCollection } from '@/components/utils/db';
import SkillsSectionView from './SkillsSectionView';

const SkillsSection = async () => {
  const skills = await getLocalizedCollection('skills');
  const softSkills = await getLocalizedCollection('soft-skills');

  return <SkillsSectionView skills={skills.docs} softSkills={softSkills.docs} />;
};

export default SkillsSection;
