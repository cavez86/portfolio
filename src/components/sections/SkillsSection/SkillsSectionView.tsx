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
      <p className="type-lead mt-6 max-w-[34ch]">{t('description')}</p>

      <div className="mt-14 md:mt-20">
        <h3 className="type-heading">{t('technical')}</h3>
        <div className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((category, index) => (
            <SkillsCard category={category} index={index} key={category.id} />
          ))}
        </div>
      </div>

      <div className="mt-16 border-t-4 border-inchiostro pt-10 md:mt-24 md:pt-14">
        <h3 className="type-heading">{t('soft')}</h3>
        <div className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {softSkillsData.map((category, index) => (
            <SkillsCard category={category} index={index + skillsData.length} key={category.id} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
