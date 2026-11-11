import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getTranslations } from 'next-intl/server';

import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { NameCradle } from './NameCradle';

const HeroSection = async () => {
  const [personalInfo, summaryInfo, t] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getLocalizedCollection('summary-info'),
    getTranslations('Hero'),
  ]);

  return (
    <section className="sheet pt-8 pb-6 md:pt-14 md:pb-10">
      <NameCradle name={personalInfo.name}>
        <div className="mt-6 flex flex-col items-start gap-5 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className="max-w-[30ch] text-lead font-semibold text-graphite md:text-[2rem] md:leading-tight">
            {personalInfo.title}
          </p>
          <a
            className="shrink-0 rounded-sm border-2 border-ink bg-ink px-6 py-3 text-lg font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            href="#contact"
          >
            {t('contact_me')}
          </a>
        </div>
      </NameCradle>

      <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="order-2 max-w-[64ch] text-body lg:order-1 [&_p+p]:mt-4 [&_strong]:bg-highlighter [&_strong]:font-semibold [&_strong]:[box-decoration-break:clone] [&_strong]:px-0.5">
          <RichText data={personalInfo.description as SerializedEditorState} />
        </div>

        <aside className="order-1 lg:order-2">
          <h2 className="math mb-3 text-lg text-red-pencil" id="given">
            {t('given')}
          </h2>
          <dl aria-labelledby="given" className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
            {summaryInfo.map((item) => (
              <div className="border-t-2 border-ink pt-2" key={item.id}>
                <dt className="text-caption text-pencil">{item.label}</dt>
                <dd className="text-lg leading-snug font-semibold text-ink md:text-xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
};

export default HeroSection;
