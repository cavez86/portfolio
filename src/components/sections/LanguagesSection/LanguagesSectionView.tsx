import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

import { Wave } from './Wave';

const LanguagesSection = async () => {
  const [languages, t, common] = await Promise.all([
    getLocalizedCollection('languages'),
    getTranslations('Languages'),
    getTranslations('Common'),
  ]);

  return (
    <Section figure={common('figure', { number: 4 })} id="languages" title={t('title')}>
      <p className="mt-3 max-w-[62ch] text-caption text-pencil">{t('caption')}</p>

      <ul className="mt-8 grid gap-8 md:mt-10">
        {languages.map((language) => (
          <li
            className="grid items-center gap-2 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8 xl:grid-cols-[18rem_minmax(0,1fr)]"
            key={language.id}
          >
            <div>
              <h3 className="text-2xl leading-tight md:text-[2rem]">{language.language}</h3>
              <p className="text-lg text-graphite">{language.proficiency}</p>
            </div>
            <Wave level={language.level} name={language.language} />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default LanguagesSection;
