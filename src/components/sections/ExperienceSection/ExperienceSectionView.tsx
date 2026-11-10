import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

import ExperienceEntry, { axisCell, entryGrid } from './ExperienceEntry';

const ExperienceSection = async () => {
  const [experience, t] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getTranslations('Experience'),
  ]);
  const now = dayjs();
  const start = Math.min(...experience.map((exp) => dayjs(exp.period.dateFrom).valueOf()));
  const axis = { end: now.valueOf(), start };

  return (
    <Section heading={t('title')} id="experience">
      <div aria-hidden="true" className={cn(entryGrid, 'text-foschia pb-3 text-sm tabular-nums')}>
        <span className={cn(axisCell, 'flex justify-between')}>
          <span>{dayjs(start).format('YYYY')}</span>
          <span>{now.format('YYYY')}</span>
        </span>
      </div>
      <ul className="border-border divide-border divide-y border-y">
        {experience.map((exp) => (
          <li key={exp.id}>
            <ExperienceEntry axis={axis} exp={exp} />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default ExperienceSection;
