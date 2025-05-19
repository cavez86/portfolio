import { getLocalizedCollection } from '@/components/utils/db';

import ExperienceSectionView from './ExperienceSectionView';
import { Suspense } from 'react';

const ExperienceSection = async () => {
  const experiencePromise = getLocalizedCollection('experience', ['-period.dateFrom']);

  return (
    <Suspense>
      <ExperienceSectionView data={experiencePromise} />
    </Suspense>
  );
};

export default ExperienceSection;
