import { ChevronRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Markdown from 'react-markdown';

import { Duration } from '@/components/common/Duration';
import { Permalink } from '@/components/common/Permalink';
import Section from '@/components/Section';
import { getReleases } from '@/components/utils/db';
import { formatMonth } from '@/components/utils/releases';
import { LatestBadge } from './LatestBadge';

const ExperienceSection = async () => {
  const [releases, t, locale] = await Promise.all([getReleases(), getTranslations('Experience'), getLocale()]);
  const firstWithNotes = releases.find(({ experience }) => experience.achievements?.length);

  return (
    <Section id="releases" title={t('title')}>
      <p className="-mt-4 mb-10 max-w-[62ch] text-[0.9375rem] text-muted-foreground">{t('rule')}</p>
      <ol className="divide-y border-y">
        {releases.map((release, index) => {
          const { experience } = release;
          const { dateFrom, dateTo } = experience.period;
          const notes = experience.achievements ?? [];
          const period = `${formatMonth(new Date(dateFrom), locale)} – ${dateTo ? formatMonth(new Date(dateTo), locale) : t('present')}`;

          return (
            <li
              className="grid scroll-mt-20 gap-x-8 gap-y-3 py-8 md:grid-cols-[7.5rem_1fr] md:py-10"
              id={release.anchor}
              key={experience.id}
            >
              <div className="flex items-center gap-2.5 md:flex-col md:items-start">
                <span className="font-mono text-[1.75rem] leading-none font-medium tracking-[-0.03em] text-primary md:text-[2.25rem]">
                  {release.version}
                </span>
                {index === 0 && <LatestBadge className="md:mt-1" />}
              </div>
              <div className="min-w-0">
                <div className="anchored">
                  <h3 className="text-[1.375rem] leading-snug font-bold tracking-[-0.015em] text-pretty">
                    {experience.position}
                  </h3>
                  <Permalink id={release.anchor} title={`${release.version} ${experience.position}`} />
                </div>
                <p className="mt-1 text-[1.0625rem] font-medium">
                  {experience.company}
                  {experience.location && (
                    <span className="font-normal text-muted-foreground">, {experience.location}</span>
                  )}
                </p>
                <p className="mt-1 text-[0.9375rem] text-muted-foreground">
                  <time dateTime={dateFrom}>{period}</time>
                  <Duration from={dateFrom} to={dateTo} />
                </p>
                {notes.length > 0 && (
                  <details className="group mt-5" open={release === firstWithNotes}>
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-sm text-[0.9375rem] font-medium text-primary select-none hover:underline [&::-webkit-details-marker]:hidden">
                      <ChevronRight
                        aria-hidden
                        className="size-4 transition-transform group-open:rotate-90 motion-reduce:transition-none"
                      />
                      {t('release_notes', { count: notes.length })}
                    </summary>
                    <ul className="mt-5 space-y-5 border-l-2 border-primary-tint pl-5">
                      {notes.map((note) => (
                        <li key={note.id ?? note.label}>
                          <h4 className="font-semibold">{note.label}</h4>
                          <div className="prose-notes mt-1 max-w-[65ch] text-muted-foreground">
                            <Markdown>{note.description}</Markdown>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};

export default ExperienceSection;
