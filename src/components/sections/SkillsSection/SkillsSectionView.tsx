import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import { BeadString } from './BeadString';

/** Technical strings take the notebook's three inks in turn; soft skills are drawn in pencil. */
const INKS = ['var(--color-ink)', 'var(--color-red-pencil)', 'var(--color-green-ink)'];

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
  const all = [...skills, ...softSkills];
  const masses = all.reduce((sum, category) => sum + (category.skills?.length ?? 0), 0);

  return (
    <Section
      figure={common('figure', { number: 3 })}
      id="skills"
      note={t('note', { masses, strings: all.length })}
      title={t('title')}
    >
      <p className="mt-3 max-w-[62ch] text-caption text-pencil">{t('caption')}</p>
      <p className="sr-only" id="skills-pluck">
        {t('pluck_hint')}
      </p>

      {groups.map((group) => (
        <div className={group.soft ? 'mt-10 md:mt-14' : 'mt-8 md:mt-12'} key={group.id}>
          <h3 className={group.soft ? 'text-xl text-graphite' : 'text-2xl md:text-[2rem]'}>{t(group.id)}</h3>
          <div className="bead-strings mt-5 md:mt-6">
            {group.categories.map((category, i) => (
              <BeadString
                hintId="skills-pluck"
                ink={group.soft ? 'var(--color-graphite)' : INKS[i % INKS.length]}
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
