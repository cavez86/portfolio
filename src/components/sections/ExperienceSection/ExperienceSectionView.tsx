import { getTranslations } from 'next-intl/server';

import ExperienceCard from '@/components/cards/ExperienceCard';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import { buildAxis, positionOf } from './timeline';

const ExperienceSection = async () => {
  const [experience, t] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getTranslations('Experience'),
  ]);
  const axis = buildAxis(experience);

  return (
    <Section field="cobalto" id="experience">
      <h2 className="type-title max-w-[14ch]">{t('title')}</h2>

      <div className="mt-12 md:mt-16">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[14rem_minmax(0,1fr)_minmax(0,1.1fr)_auto] gap-x-8 px-4 pb-3 md:grid"
        >
          <span className="col-start-3 relative block h-5">
            {axis.ticks.map((tick) => (
              <span
                className="type-small absolute -translate-x-1/2 first:translate-x-0"
                key={tick}
                style={{ left: `${positionOf(tick, axis)}%` }}
              >
                {tick}
              </span>
            ))}
          </span>
          <span className="w-11" />
        </div>
        <ul>
          {experience.map((exp) => (
            <li key={exp.id}>
              <ExperienceCard axis={axis} exp={exp} />
            </li>
          ))}
        </ul>
        <div className="border-t-2 border-current" />
      </div>
    </Section>
  );
};

export default ExperienceSection;
