import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import SkillsGroup from './SkillsGroup';

const SkillsSection = async () => {
  const [skillsData, softSkillsData, t] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
  ]);

  return (
    <Section heading={t('title')} id="skills">
      <SkillsGroup categories={skillsData} />
      <h3 className="font-display mt-10 mb-4 text-2xl leading-tight font-medium tracking-tight italic md:mt-14">
        {t('soft')}
      </h3>
      <SkillsGroup categories={softSkillsData} secondary />
    </Section>
  );
};

export default SkillsSection;
