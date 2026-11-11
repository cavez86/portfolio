import { cacheLife } from 'next/cache';
import { getLocale, getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

import ExperienceSegment from './ExperienceSegment';
import { buildTimeline } from './timeline';

/** Today, refreshed daily: the right end of the time axis. */
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
  const { positions, segments, ticks } = buildTimeline(experience, new Date(now));
  const span = ticks.length > 0 ? (Date.parse(now) - Date.UTC(ticks[0].year, 0, 1)) / (365.25 * 864e5) : 1;
  const todayLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date(now));

  // Where the world-line jumps from one position to the next.
  const steps = segments.slice(0, -1).flatMap((segment, i) => {
    const previous = segments[i + 1];
    if (previous.level === segment.level) return [];
    return [
      {
        at: segment.from,
        high: Math.max(segment.level, previous.level),
        id: segment.item.id,
        low: Math.min(segment.level, previous.level),
      },
    ];
  });

  return (
    <Section figure={common('figure', { number: 2 })} id="experience" title={t('title')}>
      <p className="mt-3 max-w-[62ch] text-caption text-pencil">
        {t('caption', { start: ticks[0]?.year ?? '', today: todayLabel })}
      </p>

      <div className="plot-frame mt-10 grid grid-cols-1 md:mt-14 md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
        {/* y axis: the positions held, oldest at the bottom */}
        <div aria-hidden="true" className="relative hidden border-r-2 border-graphite md:block">
          {positions.map((position, level) => (
            <div
              className="absolute right-0 flex items-center justify-end pr-4 text-right text-[0.95rem] leading-snug text-pencil"
              key={position}
              style={{ bottom: `calc(${level} * var(--row))`, height: 'var(--row)', left: 0 }}
            >
              {position}
              <span className="absolute -right-0.5 h-0.5 w-2.5 bg-graphite" />
            </div>
          ))}
          <span className="math absolute -top-8 right-3 text-graphite">{t('y_axis')}</span>
        </div>

        <div className="relative md:mr-24">
          <div
            className="plot border-graphite md:border-b-2 max-md:border-l-2 max-md:ml-12"
            style={
              {
                '--levels': positions.length,
                '--span': span,
              } as React.CSSProperties
            }
          >
            {steps.map((step) => (
              <span
                aria-hidden="true"
                className="plot-step"
                key={step.id}
                style={{ '--at': step.at, '--high': step.high, '--low': step.low } as React.CSSProperties}
              />
            ))}
            <ol className="contents">
              {segments.map((segment) => (
                <li className="contents" key={segment.item.id}>
                  <ExperienceSegment levels={positions.length} segment={segment} />
                </li>
              ))}
            </ol>
            {ticks.map((tick) => (
              <span
                aria-hidden="true"
                className={cn(
                  'plot-tick text-[0.85rem] text-pencil tabular-nums',
                  'md:-bottom-8 md:-translate-x-1/2 md:before:absolute md:before:-top-2 md:before:left-1/2 md:before:h-2 md:before:w-0.5 md:before:bg-graphite',
                  'max-md:-left-12 max-md:translate-y-1/2 max-md:before:absolute max-md:before:top-1/2 max-md:before:-right-3.5 max-md:before:h-0.5 max-md:before:w-2 max-md:before:bg-graphite'
                )}
                key={tick.year}
                style={{ '--at': tick.at } as React.CSSProperties}
              >
                {tick.year}
              </span>
            ))}
            <span
              aria-hidden="true"
              className="math absolute text-graphite md:-right-16 md:-bottom-3 max-md:-top-9 max-md:-left-12"
            >
              {t('t_axis')}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
