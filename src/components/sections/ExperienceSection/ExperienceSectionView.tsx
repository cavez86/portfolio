import { getTranslations } from 'next-intl/server';

import { getLocalizedCollection } from '@/components/utils/db';
import type { Experience } from '@/payload-types';
import ExperienceStop, { type StopKind, type ZonePart } from './ExperienceStop';
import { groupByEmployer } from './grouping';
import TramLine from './TramLine';

const zonePart = (index: number, size: number): ZonePart | undefined => {
  if (size < 2) return undefined;
  if (index === 0) return 'first';
  return index === size - 1 ? 'last' : 'middle';
};

const ExperienceSection = async () => {
  const [experience, t] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getTranslations('Experience'),
  ]);
  const kindOf = (exp: Experience): StopKind => {
    if (exp === experience[0]) return 'terminus';
    return exp === experience.at(-1) ? 'origin' : 'stop';
  };

  const stops = groupByEmployer(experience).map((group) => {
    const items = group.map((exp, i) => (
      <ExperienceStop exp={exp} key={exp.id} kind={kindOf(exp)} zone={zonePart(i, group.length)} />
    ));
    return group.length > 1 ? (
      <li key={group[0].id}>
        <ol>{items}</ol>
      </li>
    ) : (
      items
    );
  });

  return (
    <section aria-labelledby="experience-title" id="experience">
      <div className="line-row pb-12 md:pb-14">
        <span aria-hidden="true" className="rail rail-planned inset-y-0" />
        <h2
          className="col-start-2 pr-5 font-display text-district font-extrabold text-balance md:col-start-3 md:pr-8"
          id="experience-title"
        >
          {t('title')}
        </h2>
      </div>
      <TramLine>
        <ol className="pb-24 md:pb-32">{stops}</ol>
      </TramLine>
    </section>
  );
};

export default ExperienceSection;
