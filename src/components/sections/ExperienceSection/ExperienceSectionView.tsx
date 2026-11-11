import { connection } from 'next/server';
import { getTranslations } from 'next-intl/server';

import ExperienceCard from '@/components/cards/ExperienceCard';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import { Conveyor } from './Conveyor';
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

  // The extra bottom room takes the skills wheel, which rises out of the next field.
  return (
    <Section className="pb-12" field="cobalto" id="experience">
      <div className="grid gap-y-10 md:grid-cols-[minmax(0,1.15fr)_8.5rem_minmax(0,1.1fr)_2.75rem] md:gap-x-8 md:px-4">
        <h2 className="type-title max-w-[14ch] md:col-span-2">{t('title')}</h2>
        <div className="mx-3.5 md:-mt-48 xl:-mt-[15.125rem]">
          <Conveyor ticks={axis.ticks.map((tick) => ({ label: tick.label, left: positionOf(tick.at, axis) }))} />
        </div>
      </div>
      <ul className="mt-8 md:mt-14">
        {experience.map((exp) => (
          <li key={exp.id}>
            <ExperienceCard axis={axis} exp={exp} />
          </li>
        ))}
      </ul>
      <div className="border-t-2 border-current" />
    </Section>
  );
};

export default ExperienceSection;
