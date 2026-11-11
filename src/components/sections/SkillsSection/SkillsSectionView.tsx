import { getTranslations } from 'next-intl/server';

import { getLocalizedCollection } from '@/components/utils/db';

import SkillStreet from './SkillStreet';

/** The skills district: every category is a street; technical skills are lit, soft skills are the quieter streets. */
const SkillsSection = async () => {
  const [skillsData, softSkillsData, t] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
  ]);

  return (
    <section aria-labelledby="skills-title" className="relative bg-isolato" id="skills">
      <span aria-hidden="true" className="district-boundary absolute inset-x-0 top-0" />
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="font-display text-district font-extrabold text-balance" id="skills-title">
          {t('title')}
        </h2>

        <h3 className="mt-12 text-lead font-semibold md:mt-16">{t('technical')}</h3>
        <div className="mt-6 grid gap-x-16 gap-y-9 md:grid-cols-2">
          {skillsData.map((category) => (
            <SkillStreet category={category} key={category.id} lit />
          ))}
        </div>

        <h3 className="mt-16 text-lead font-semibold md:mt-20">{t('soft')}</h3>
        <div className="mt-6 grid gap-x-16 gap-y-9 md:grid-cols-2">
          {softSkillsData.map((category) => (
            <SkillStreet category={category} key={category.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
