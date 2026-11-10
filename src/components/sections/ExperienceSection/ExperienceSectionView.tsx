import { connection } from 'next/server';
import { getTranslations } from 'next-intl/server';

import ExperienceCard from '@/components/cards/ExperienceCard';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

import { buildAxis, positionOf } from './timeline';

const ExperienceSection = async () => {
  const [experience, t] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getTranslations('Experience'),
  ]);
  // The axis ends today, so the date must not be frozen into the prerender.
  await connection();
  const axis = buildAxis(
    experience.map((exp) => exp.period),
    new Date()
  );
  const last = axis.ticks.length - 1;

  return (
    <Section field="cobalto" id="experience">
      <h2 className="type-title max-w-[14ch]">{t('title')}</h2>

      <div className="mt-12 md:mt-16">
        <div
          aria-hidden="true"
          className="pb-3 md:grid md:grid-cols-[minmax(0,1.15fr)_8.5rem_minmax(0,1.1fr)_2.75rem] md:gap-x-8 md:px-4"
        >
          <span className="relative mx-3.5 block h-5 md:col-start-3">
            {axis.ticks.map((tick, i) => (
              <span
                className={cn(
                  'type-small absolute',
                  i === 0 && 'left-0',
                  i === last && 'right-0',
                  i > 0 && i < last && '-translate-x-1/2'
                )}
                key={tick.label}
                style={i > 0 && i < last ? { left: `${positionOf(tick.at, axis)}%` } : undefined}
              >
                {tick.label}
              </span>
            ))}
          </span>
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
