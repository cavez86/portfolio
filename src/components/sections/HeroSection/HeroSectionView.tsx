import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import { gutter } from '@/components/Section';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';
import { cn } from '@/lib/utils';

// Each name line is composed on its own: roman, italic, roman, staggered like a specimen's size lines.
const nameLineStyles = ['-ml-[0.03em]', 'ml-[6vw] italic md:ml-[10vw] lg:ml-[22vw]', 'ml-[3vw] lg:ml-[7vw]'] as const;

const splitName = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length >= 3) {
    return [words[0], words[1], words.slice(2).join(' ')];
  }
  return words;
};

const HeroSection = async () => {
  const [personalInfoData, summaryInfoData, t] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getLocalizedCollection('summary-info'),
    getTranslations('Hero'),
  ]);
  const nameLines = splitName(personalInfoData.name);

  return (
    <section className="overflow-x-clip pt-6 pb-20 md:pt-10 md:pb-32">
      <div className={gutter}>
        <h1 className="font-display text-[clamp(3.5rem,min(calc((100vw_-_2.5rem)/4.4),31svh),22rem)] md:text-[clamp(3.5rem,min(calc((100vw_-_5rem)/4.5),31svh),22rem)] leading-[0.84] font-medium tracking-[-0.035em] [font-variation-settings:'opsz'_40]">
          {nameLines.map((line, index) => (
            <span
              className={cn('name-line', nameLineStyles[index])}
              key={line}
              style={{ '--line': index } as CSSProperties}
            >
              <span>{line}</span>{' '}
            </span>
          ))}
        </h1>

        <div className="after-name mt-6 grid items-end gap-6 md:mt-8 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.12] font-normal tracking-tight text-balance italic lg:col-span-8">
            {personalInfoData.title}
          </h2>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link className={buttonVariants({ size: 'lg' })} href="#contact">
              {t('contact_me')}
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-x-10">
          <div className="prose-specimen max-w-[62ch] text-lg leading-[1.65] text-pretty lg:col-span-5">
            <RichText data={personalInfoData.description as SerializedEditorState} />
          </div>

          <dl className="order-first lg:order-last lg:col-span-7">
            {summaryInfoData.map((item) => (
              <div
                className="border-border grid grid-cols-[6.5rem_1fr] items-baseline gap-x-5 border-t py-4 last:border-b sm:grid-cols-[9rem_1fr] md:py-5"
                key={item.id}
              >
                <dt className="text-foschia text-base leading-snug">{t(item.label)}</dt>
                <dd className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] font-normal tracking-tight text-balance">
                  {t(item.value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
