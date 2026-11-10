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
    <Section heading={t('title')} id="skills" intro={t('description')}>
      <SkillsGroup categories={skillsData} />
      <h3 className="font-display mt-14 mb-5 text-2xl leading-tight tracking-tight italic md:mt-16">{t('soft')}</h3>
      <SkillsGroup categories={softSkillsData} secondary />
    </Section>
  );
};

export default SkillsSection;
