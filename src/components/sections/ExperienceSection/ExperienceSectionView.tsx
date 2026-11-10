import { getTranslations } from 'next-intl/server';

import ExperienceCard from '@/components/cards/ExperienceCard';
import Section, { SectionHeading } from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import ExperienceTimeline from './ExperienceTimeline';

const ExperienceSection = async () => {
  const [experience, t] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getTranslations('Experience'),
  ]);

  return (
    <Section heading={<SectionHeading title={t('title')} />} id="experience">
      <ExperienceTimeline>
        {experience.map((exp, index) => (
          <ExperienceCard exp={exp} isTerminus={index === 0} key={exp.id} />
        ))}
      </ExperienceTimeline>
    </Section>
  );
};

export default ExperienceSection;
