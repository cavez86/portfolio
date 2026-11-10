import { getTranslations } from 'next-intl/server';
import SkillsCard from '@/components/cards/SkillsCard';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const SkillsSection = async () => {
  const [skillsData, softSkillsData, t] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
  ]);

  return (
    <Section field="girasole" id="skills">
      <h2 className="type-title max-w-[12ch]">{t('title')}</h2>

      <div className="mt-12 md:mt-16">
        <h3 className="type-heading mb-5">{t('technical')}</h3>
        {skillsData.map((category, index) => (
          <SkillsCard category={category} index={index} key={category.id} />
        ))}
        <div className="border-t-2 border-inchiostro" />
      </div>

      <div className="mt-12 md:mt-16">
        <h3 className="type-subheading mb-4">{t('soft')}</h3>
        {softSkillsData.map((category, index) => (
          <SkillsCard category={category} index={index + skillsData.length} key={category.id} secondary />
        ))}
        <div className="border-t-2 border-inchiostro" />
      </div>
    </Section>
  );
};

export default SkillsSection;
