import { getLocale, getTranslations } from 'next-intl/server';

import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';
import { yearsSince } from '@/components/utils/period';
import { cn } from '@/lib/utils';
import type { SummaryInfo } from '@/payload-types';

import { buildSnippet, type SnippetLine, type SnippetProperty, type Token } from './snippet';

const tokenClass: Record<Token['kind'], string> = {
  comment: 'text-syn-comment italic',
  keyword: 'text-syn-keyword italic',
  number: 'text-syn-number',
  property: 'text-primary group-hover/line:underline group-focus-visible/line:underline',
  punctuation: 'text-muted-foreground',
  string: 'text-syn-string',
  variable: 'font-bold',
};

// Summary facts carry no stable key besides their icon; the labels are localized.
const summaryValue = (items: SummaryInfo[], icon: SummaryInfo['icon']) =>
  items.find((item) => item.icon === icon)?.value;

const SnippetLineView = ({ line }: { line: SnippetLine }) => {
  const className = cn('block pr-(--pad)', line.depth === 1 ? 'pl-[calc(var(--pad)+4ch)] -indent-[4ch]' : 'pl-(--pad)');
  const content = (
    <>
      {'  '.repeat(line.depth)}
      {line.tokens.map((token, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional and never reorder
        <span className={tokenClass[token.kind]} key={index}>
          {token.text}
        </span>
      ))}
    </>
  );

  if (!line.section) return <span className={className}>{content}</span>;
  return (
    <a
      className={cn(className, 'group/line outline-offset-[-2px] hover:bg-highlight focus-visible:bg-highlight')}
      data-goto={line.section}
      href={`#${line.section}`}
    >
      {content}
    </a>
  );
};

const HeroSection = async () => {
  const [personalInfo, summary, experience, languages, locale, t] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getLocalizedCollection('summary-info'),
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getLocalizedCollection('languages'),
    getLocale(),
    getTranslations('Hero'),
  ]);

  const now = new Date();
  const latest = experience[0];
  const first = experience.at(-1);
  const years = first ? yearsSince(new Date(first.period.dateFrom), now) : undefined;
  const since =
    latest && !latest.period.dateTo
      ? new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC', year: 'numeric' }).format(
          new Date(latest.period.dateFrom)
        )
      : undefined;
  const stack = summaryValue(summary, 'Code');

  const properties: SnippetProperty[] = [
    { key: 'role', section: 'experience', value: latest?.position },
    { comment: since && t('since', { date: since }), key: 'company', section: 'experience', value: latest?.company },
    { key: 'location', section: 'experience', value: latest?.location },
    { key: 'yearsOfExperience', section: 'experience', value: years },
    { key: 'stack', section: 'skills', value: stack?.split(/\s*,\s*/) },
    { key: 'languages', section: 'languages', value: languages.map(({ language }) => language) },
    { key: 'education', section: 'education', value: summaryValue(summary, 'GraduationCap') },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="page-frame grid items-center gap-x-12 gap-y-10 pt-10 pb-14 md:pt-16 md:pb-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
    >
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-[2.75rem] leading-[1.05] font-bold tracking-tight text-balance md:text-6xl" id="hero-title">
          {personalInfo.name}
        </h1>
        {latest && (
          <p className="max-w-[34ch] text-xl text-pretty text-muted-foreground">
            {t('summary', { company: latest.company, role: latest.position, years: years ?? 0 })}
          </p>
        )}
        <div className="flex flex-wrap gap-3 pt-2">
          <a className={buttonVariants()} href="#contact">
            {t('contact_me')}
          </a>
          <ExportPDFButton />
        </div>
      </div>

      <figure className="-mx-4 sm:mx-0">
        <pre className="overflow-hidden border-y border-border bg-panel py-5 font-mono text-sm leading-[1.7] whitespace-pre-wrap [--pad:1rem] sm:rounded-lg sm:border sm:py-8 sm:text-[clamp(1rem,0.2rem+2.2vw,1.5rem)] sm:[--pad:2rem] lg:text-[clamp(1rem,0.2rem+1.6vw,1.625rem)]">
          <code>
            {buildSnippet(personalInfo.name, properties).map((line) => (
              <SnippetLineView key={line.tokens.map(({ text }) => text).join('')} line={line} />
            ))}
          </code>
        </pre>
        <figcaption className="sr-only">{t('snippet_caption')}</figcaption>
      </figure>
    </section>
  );
};

export default HeroSection;
