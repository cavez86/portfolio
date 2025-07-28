import { Suspense } from 'react';

import { getLocalizedCollection } from '@/components/utils/db';

import ExperienceSectionView from './ExperienceSectionView';

const ExperienceSection = async () => {
  const experiencePromise = getLocalizedCollection('experience', ['-period.dateFrom']);

  return (
    <Suspense>
      <ExperienceSectionView data={experiencePromise} />
    </Suspense>
  );
};

export default ExperienceSection;
