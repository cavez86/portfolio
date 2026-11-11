import { getTranslations } from 'next-intl/server';

import { getLocalizedCollection } from '@/components/utils/db';

import SkillLine from './SkillLine';
import SkillsNetwork from './SkillsNetwork';

/** Line colours of the skills network (the tram's red stays reserved for the career line). */
const LINE_COLOURS = ['#f4a93c', '#7cc7bd', '#f58fb6', '#8db4ff', '#b9dc6e', '#c9a5f5'];

/** The skills district drawn as a network: technical categories are coloured lines, soft skills are footpaths. */
const SkillsSection = async () => {
  const [skillsData, softSkillsData, t] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
  ]);
  const names = [...skillsData, ...softSkillsData].flatMap((category) => category.skills?.map((s) => s.skill) ?? []);
  const interchanges = new Set(names.filter((name, i) => names.indexOf(name) !== i));

  return (
    <section aria-labelledby="skills-title" className="relative bg-isolato" id="skills">
      <span aria-hidden="true" className="district-boundary absolute inset-x-0 top-0" />
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="font-display text-district font-extrabold text-balance" id="skills-title">
          {t('title')}
        </h2>

        <SkillsNetwork>
          <h3 className="mt-12 text-lead font-semibold md:mt-16">{t('technical')}</h3>
          <div className="mt-6 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {skillsData.map((category, i) => (
              <SkillLine
                category={category}
                colour={LINE_COLOURS[i % LINE_COLOURS.length]}
                interchanges={interchanges}
                key={category.id}
              />
            ))}
          </div>

          <h3 className="mt-16 text-lead font-semibold md:mt-20">{t('soft')}</h3>
          <div className="mt-6 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {softSkillsData.map((category) => (
              <SkillLine category={category} interchanges={interchanges} key={category.id} />
            ))}
          </div>
        </SkillsNetwork>
      </div>
    </section>
  );
};

export default SkillsSection;
