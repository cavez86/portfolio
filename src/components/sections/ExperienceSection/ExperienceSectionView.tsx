import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Markdown from 'react-markdown';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { monthsSpanned, splitMonths, yearMonth } from '@/components/utils/period';
import type { Experience } from '@/payload-types';

type Translate = Awaited<ReturnType<typeof getTranslations<'Experience'>>>;

const Period = ({ exp, now, t }: { exp: Experience; now: Date; t: Translate }) => {
  const from = new Date(exp.period.dateFrom);
  const to = exp.period.dateTo ? new Date(exp.period.dateTo) : undefined;

  return (
    <p className="font-mono text-base leading-relaxed">
      <time dateTime={yearMonth(from)}>{yearMonth(from)}</time>
      <span className="text-muted-foreground"> – </span>
      {to ? <time dateTime={yearMonth(to)}>{yearMonth(to)}</time> : t('present')}
      <span className="block text-syn-number">{t('duration', splitMonths(monthsSpanned(from, to ?? now))).trim()}</span>
    </p>
  );
};

const ExperienceSection = async () => {
  const [experience, t] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getTranslations('Experience'),
  ]);
  const now = new Date();

  return (
    <Section id="experience" title={t('title')}>
      <ol className="flex flex-col">
        {experience.map((exp) => {
          const achievements = exp.achievements ?? [];
          return (
            <li
              className="doc-columns gap-y-2 border-t border-border py-8 first:border-t-0 first:pt-0 last:pb-0"
              key={exp.id}
            >
              <Period exp={exp} now={now} t={t} />
              <div className="min-w-0">
                <h3 className="text-xl leading-snug font-bold text-balance">{exp.position}</h3>
                <p className="text-muted-foreground">
                  <span className="text-foreground">{exp.company}</span>
                  {exp.location && `, ${exp.location}`}
                </p>
                {achievements.length > 0 && (
                  <details className="group mt-4">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-sm font-bold text-primary hover:underline [&::-webkit-details-marker]:hidden">
                      <ChevronRight aria-hidden className="size-4 group-open:rotate-90" />
                      {t('achievements', { count: achievements.length })}
                    </summary>
                    <ul className="mt-5 flex flex-col gap-5 border-l-2 border-border pl-5">
                      {achievements.map((achievement) => (
                        <li key={achievement.id ?? achievement.label}>
                          <h4 className="font-bold">{achievement.label}</h4>
                          <div className="text-pretty [&_a]:text-primary [&_a]:underline [&_a:hover]:decoration-2">
                            <Markdown>{achievement.description}</Markdown>
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
