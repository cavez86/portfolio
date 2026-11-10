import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const LanguagesSection = async () => {
  const [languagesData, t] = await Promise.all([getLocalizedCollection('languages'), getTranslations('Languages')]);

  return (
    <Section heading={t('title')} id="languages" intro={t('description')}>
      <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2">
        {languagesData.map((lang) => (
          <li className="border-border border-t pt-6" key={lang.id}>
            <p className="font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-none font-medium tracking-tight">
              {lang.language}
            </p>
            <p className="mt-3 text-lg">{lang.proficiency}</p>
            <span aria-hidden="true" className="bg-notte mt-5 block h-1.5 w-full">
              <span className="bg-carta block h-full" style={{ width: `${lang.level}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default LanguagesSection;
