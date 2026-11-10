import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getTranslations } from 'next-intl/server';

import Icon, { type IconName } from '@/components/common/Icon';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import StreetMap from './StreetMap';

const HeroSection = async () => {
  const [personalInfoData, summaryInfoData, t] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getLocalizedCollection('summary-info'),
    getTranslations('Hero'),
  ]);

  return (
    <section>
      <div className="relative isolate flex min-h-[calc(100svh-3.5rem)] items-end overflow-hidden md:min-h-[min(46rem,calc(100svh-3.5rem))] md:items-center">
        <StreetMap className="md:hidden" variant="tall" />
        <StreetMap className="hidden md:block" variant="wide" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-16">
          <div className="max-w-3xl border-2 border-primary bg-background p-6 outline outline-1 -outline-offset-8 outline-primary/45 md:p-12">
            <h1 className="text-name font-extrabold tracking-tight text-balance text-foreground">
              {personalInfoData.name}
            </h1>
            <p className="mt-5 max-w-[34ch] text-lead font-medium text-pretty text-primary">{personalInfoData.title}</p>
            <a className={buttonVariants({ className: 'mt-8', size: 'lg' })} href="#contact">
              {t('contact_me')}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:gap-24">
        <div className="payload-richtext text-body text-pretty text-foreground/90">
          <RichText data={personalInfoData.description as SerializedEditorState} />
        </div>

        <dl className="flex flex-col self-start border-t border-border lg:border-t-0 lg:border-l lg:pl-10">
          {summaryInfoData.map((item) => (
            <div
              className="flex items-start gap-4 border-b border-border py-4 last:border-b-0 lg:first:pt-0"
              key={item.id}
            >
              <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" name={item.icon as IconName} />
              <div>
                <dt className="text-small text-muted-foreground">{t(item.label)}</dt>
                <dd className="text-lead font-semibold">{t(item.value)}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;
