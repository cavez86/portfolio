import { cacheLife } from 'next/cache';
import { getLocale, getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import { ExperienceFigure } from './ExperienceFigure';
import { buildTimeline } from './timeline';

/** Today, refreshed daily: the top of the time axis. */
const today = async () => {
  'use cache';
  cacheLife('days');
  return new Date().toISOString();
};

const ExperienceSection = async () => {
  const [experience, now, locale, t, common] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    today(),
    getLocale(),
    getTranslations('Experience'),
    getTranslations('Common'),
  ]);
  const { firstYear, total } = buildTimeline(experience, new Date(now));
  const todayLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date(now));

  return (
    <Section
      figure={common('figure', { number: 2 })}
      id="experience"
      note={t('note', { start: firstYear, total: Math.round(total * 10) / 10 })}
      title={t('title')}
    >
      <p className="mt-3 max-w-[62ch] text-caption text-pencil">
        {t('caption', { start: firstYear, today: todayLabel })}
      </p>
      <div className="mt-8 md:mt-12">
        <ExperienceFigure experience={experience} now={now} todayLabel={todayLabel} />
      </div>
    </Section>
  );
};

export default ExperienceSection;
