import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getLocale, getTranslations } from 'next-intl/server';

import { Duration } from '@/components/common/Duration';
import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedGlobal, getReleases } from '@/components/utils/db';
import { splitDescription } from '@/components/utils/description';
import { formatMonth } from '@/components/utils/releases';

import { LatestBadge } from '../ExperienceSection/LatestBadge';

const HeroSection = async () => {
  const [personalInfo, [latest], t, locale] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getReleases(),
    getTranslations('Hero'),
    getLocale(),
  ]);
  const { lead } = splitDescription(personalInfo.description as SerializedEditorState | null);

  return (
    <section className="mb-14 border-b pt-14 pb-14 md:mb-20 md:pt-24 md:pb-20">
      {latest && (
        <p className="flex items-center gap-2.5">
          <a
            className="rounded-sm bg-primary-tint px-2 py-0.5 font-mono text-[0.9375rem] font-medium text-primary hover:underline"
            href={`#${latest.anchor}`}
          >
            {latest.version}
          </a>
          <LatestBadge />
        </p>
      )}
      <h1 className="mt-5 max-w-[12ch] text-[clamp(3.25rem,9.4vw,8.5rem)] leading-[0.92] font-extrabold tracking-[-0.045em] text-balance">
        {personalInfo.name}
      </h1>
      {latest && (
        <p className="mt-8 max-w-[38ch] text-[1.375rem] leading-snug font-semibold tracking-[-0.01em] md:text-[1.625rem]">
          {t('role', {
            company: latest.experience.company,
            location: latest.experience.location ?? '',
            position: latest.experience.position,
          })}
          <span className="block text-[1.0625rem] font-normal text-muted-foreground md:text-lg">
            {t('since', { date: formatMonth(new Date(latest.experience.period.dateFrom), locale, 'long') })}
            <Duration from={latest.experience.period.dateFrom} />
          </span>
        </p>
      )}
      {lead && (
        <div className="prose-notes mt-6 max-w-[60ch] text-lg text-muted-foreground md:text-xl md:leading-relaxed">
          <RichText data={lead} />
        </div>
      )}
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a className={buttonVariants({ size: 'lg' })} href="#contact">
          {t('contact_me')}
        </a>
        <ExportPDFButton />
      </div>
    </section>
  );
};

export default HeroSection;
