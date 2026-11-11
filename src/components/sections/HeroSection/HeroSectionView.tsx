import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { HERO_VARS } from './cityMap';
import MapLantern from './MapLantern';
import StreetMap from './StreetMap';

const HeroSection = async () => {
  const [personalInfoData, summaryInfoData, t] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getLocalizedCollection('summary-info'),
    getTranslations('Hero'),
  ]);
  const [firstName, ...surnames] = personalInfoData.name.trim().split(/\s+/);

  return (
    <section>
      <div className="relative flex items-center overflow-hidden bg-notte md:max-h-[calc(100svh-3.5rem)]">
        <div className="@container relative aspect-(--map-ratio) w-full md:aspect-(--map-ratio-md)" style={HERO_VARS}>
          <StreetMap className="md:hidden" name={personalInfoData.name} variant="tall" />
          <StreetMap className="hidden md:block" name={personalInfoData.name} variant="wide" />
          <MapLantern />

          {/* Lettered into the map like a district name: one word per line on phones, surnames together on wider maps. */}
          <h1 className="absolute top-(--name-y) left-(--name-x) font-display text-(length:--name-size) leading-[0.86] font-extrabold tracking-[0.005em] text-carta md:top-(--name-y-md) md:left-(--name-x-md) md:text-(length:--name-size-md)">
            <span className="block">{firstName}</span>
            <span className="block">
              {surnames.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && ' '}
                  <span className="block md:inline">{word}</span>
                </Fragment>
              ))}
            </span>
          </h1>
          <p className="absolute top-(--title-y) left-(--title-x) max-w-(--title-w) text-[max(1rem,var(--title-size))] leading-[1.3] font-semibold text-pretty text-lampione md:top-(--title-y-md) md:left-(--title-x-md) md:max-w-(--title-w-md) md:text-[max(1rem,var(--title-size-md))]">
            {personalInfoData.title}
          </p>
          <a
            className={buttonVariants({
              className:
                'absolute top-(--cta-y) left-(--cta-x) h-auto px-[1.3em] py-[0.8em] text-[max(1rem,var(--cta-size))] md:top-(--cta-y-md) md:left-(--cta-x-md) md:text-[max(1rem,var(--cta-size-md))]',
              size: 'lg',
            })}
            href="#contact"
          >
            {t('contact_me')}
          </a>
        </div>
      </div>

      {/* The line leaves the map and runs past the introduction, still under construction. */}
      <div className="line-row pt-14 pb-16 md:pt-20 md:pb-20">
        <span aria-hidden="true" className="rail rail-planned inset-y-0" />
        <div className="payload-richtext col-start-2 max-w-[62ch] pr-5 text-body text-pretty text-carta/90 md:col-start-3 md:pr-8">
          <RichText data={personalInfoData.description as SerializedEditorState} />
        </div>

        <dl className="col-start-2 mt-12 grid grid-cols-2 gap-x-6 gap-y-6 pr-5 md:col-start-1 md:row-start-1 md:mt-0 md:grid-cols-1 md:self-start md:pr-10 md:text-right">
          {summaryInfoData.map((item) => (
            <div key={item.id}>
              <dt className="text-small text-muted-foreground">{t(item.label)}</dt>
              <dd className="text-lead font-semibold text-balance">{t(item.value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;
