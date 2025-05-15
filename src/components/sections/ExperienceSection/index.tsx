import { getLocalizedCollection } from '@/components/utils/db';

import ExperienceSectionView from './ExperienceSectionView';

const ExperienceSection = async () => {
  const experience = await getLocalizedCollection('experience', ['-period.dateFrom']);

  return <ExperienceSectionView experience={experience.docs} />;
};

export default ExperienceSection;
