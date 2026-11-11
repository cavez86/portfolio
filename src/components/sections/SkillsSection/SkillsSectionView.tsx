import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import { BeadString } from './BeadString';

const SkillsSection = async () => {
  const [skills, softSkills, t, common] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
    getTranslations('Common'),
  ]);

  const groups = [
    { categories: skills, id: 'technical', soft: false },
    { categories: softSkills, id: 'soft', soft: true },
  ] as const;

  return (
    <Section figure={common('figure', { number: 3 })} id="skills" title={t('title')}>
      <p className="mt-3 max-w-[62ch] text-caption text-pencil" id="skills-caption">
        {t('caption')}
      </p>

      {groups.map((group) => (
        <div className="mt-10 md:mt-14" key={group.id}>
          <h3 className={group.soft ? 'text-xl text-graphite' : 'text-2xl md:text-[2rem]'}>{t(group.id)}</h3>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-8 xl:grid-cols-1 xl:gap-y-6">
            {group.categories.map((category) => (
              <BeadString
                hintId="skills-caption"
                key={category.id}
                name={category.name}
                skills={category.skills?.map((entry) => entry.skill) ?? []}
                soft={group.soft}
              />
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
};

export default SkillsSection;
