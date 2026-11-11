import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import { Gauge } from './Gauge';

const LanguagesSection = async () => {
  const [languagesData, t] = await Promise.all([getLocalizedCollection('languages'), getTranslations('Languages')]);

  return (
    <Section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center" field="abete">
      <h2 className="type-title">{t('title')}</h2>
      <ul className="flex flex-wrap gap-x-8 gap-y-10 md:gap-x-12">
        {languagesData.map((lang) => (
          <li className="flex w-min flex-col gap-5" key={lang.id}>
            <Gauge label={`${lang.language}: ${lang.proficiency}`} level={lang.level} />
            <div>
              <h3 className="type-heading">{lang.language}</h3>
              <p className="mt-1 font-semibold">{lang.proficiency}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default LanguagesSection;
