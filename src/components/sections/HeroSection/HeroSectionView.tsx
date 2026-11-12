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
    <section className="sheet pt-6 pb-6 md:pt-10 md:pb-10">
      <NameCradle name={personalInfo.name}>
        <div className="flex flex-col items-start gap-5">
          <p className="max-w-[26ch] text-[1.5rem] leading-tight font-semibold text-graphite md:text-[1.75rem] xl:text-[1.5rem] 2xl:text-[1.75rem]">
            {personalInfo.title}
          </p>
          <a
            className="rounded-sm border-2 border-ink bg-ink px-6 py-3 text-lg font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            href="#contact"
          >
            {t('contact_me')}
          </a>
        </div>
      </NameCradle>

      <div className="mt-12 grid gap-10 md:mt-16 xl:grid-cols-[minmax(0,64ch)_minmax(0,1fr)] xl:gap-16 2xl:gap-24">
        {/* Only the opening paragraph's key phrases get the highlighter; later ones are just set in bold. */}
        <div className="order-2 max-w-[64ch] text-body xl:order-1 [&_p+p]:mt-5 [&_p:first-child_strong]:bg-highlighter [&_p:first-child_strong]:px-0.5 [&_p:first-child_strong]:[box-decoration-break:clone] [&_strong]:font-semibold [&_strong]:text-graphite">
          <RichText data={personalInfo.description as SerializedEditorState} />
        </div>

        <aside className="order-1 xl:order-2">
          <h2 className="math mb-4 text-xl text-pencil" id="given">
            {t('given')}
          </h2>
          <dl
            aria-labelledby="given"
            className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-10 md:grid-cols-4 xl:grid-cols-2"
          >
            {summaryInfo.map((item) => (
              <div className="border-t-2 border-ink pt-2" key={item.id}>
                <dt className="text-caption text-pencil">{item.label}</dt>
                <dd className="text-xl leading-snug font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
};

export default HeroSection;
