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
    <section className="bg-carta text-inchiostro px-5 pt-10 pb-16 md:px-10 md:pt-16 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-6">
          <div>
            <h1 className="type-display">
              {personalInfoData.name.split(' ').map((word) => (
                <span className="block" key={word}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="type-lead mt-8 max-w-[28ch]">{personalInfoData.title}</p>
            <Link className={buttonVariants({ className: 'mt-8', size: 'lg' })} href="#contact">
              {t('contact_me')}
            </Link>
          </div>
          <HeroMechanism className="mx-auto h-auto w-full max-w-[34rem] lg:max-w-none" />
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
