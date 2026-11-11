import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { HeroMechanism } from './HeroMechanism';

const HeroSection = async () => {
  const [personalInfoData, summaryInfoData, t] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getLocalizedCollection('summary-info'),
    getTranslations('Hero'),
  ]);

  return (
    <section className="bg-carta text-inchiostro px-5 pt-6 pb-16 md:px-10 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]">
          <div className="relative z-10 lg:pt-10">
            <h1 className="type-display">
              {personalInfoData.name.split(' ').map((word) => (
                <span className="block" key={word}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="type-lead mt-4 max-w-[24ch] md:mt-8">{personalInfoData.title}</p>
            <Link className={buttonVariants({ className: 'mt-5 md:mt-8', size: 'lg' })} href="#contact">
              {t('contact_me')}
            </Link>
          </div>
          <HeroMechanism
            className="-mr-5 ml-[-12%] mt-4 w-[calc(112%+1.25rem)] md:-mr-10 lg:mt-0 lg:ml-16 lg:w-[calc(100%+5rem)]"
            label={t('turn')}
          />
        </div>

        <div className="mt-14 grid gap-10 border-t-4 border-inchiostro pt-10 md:mt-20 lg:grid-cols-[minmax(0,40rem)_1fr] lg:gap-20">
          <div className="max-w-[62ch] [&_p+p]:mt-4 [&_p]:text-pretty">
            <RichText data={personalInfoData.description as SerializedEditorState} />
          </div>
          <dl className="grid content-start gap-x-8 gap-y-6 sm:grid-cols-2">
            {summaryInfoData.map((item) => (
              <div key={item.id}>
                <dt className="type-small text-sottile">{t(item.label)}</dt>
                <dd className="type-subheading mt-1">{t(item.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
