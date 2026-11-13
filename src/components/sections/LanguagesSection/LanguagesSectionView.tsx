import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const LanguagesSection = async () => {
  const [languages, t] = await Promise.all([
    getLocalizedCollection('languages', ['-level']),
    getTranslations('Languages'),
  ]);

  return (
    <Section id="languages" title={t('title')}>
      <dl className="flex flex-col gap-4">
        {languages.map((language) => (
          <div className="doc-columns gap-y-1" key={language.id}>
            <dt className="font-bold">{language.language}</dt>
            <dd className="text-muted-foreground">{language.proficiency}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
};

export default LanguagesSection;
