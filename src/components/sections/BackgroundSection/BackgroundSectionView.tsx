import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const rowClass = 'grid gap-x-8 gap-y-1.5 py-4 sm:grid-cols-[13rem_1fr]';

const BackgroundSection = async () => {
  const [education, languages, t] = await Promise.all([
    getLocalizedCollection('education'),
    getLocalizedCollection('languages', ['-level']),
    getTranslations('Background'),
  ]);

  return (
    <Section id="background" title={t('title')}>
      <dl className="divide-y border-y">
        {education.length > 0 && (
          <div className={rowClass}>
            <dt className="font-semibold">{t('education')}</dt>
            {education.map((item) => (
              <dd className="sm:col-start-2" key={item.id}>
                {item.degree}
                <span className="block text-[0.9375rem] text-muted-foreground">
                  {item.institution}, {item.period}
                </span>
              </dd>
            ))}
          </div>
        )}
        {languages.length > 0 && (
          <div className={rowClass}>
            <dt className="font-semibold">{t('languages')}</dt>
            <dd>
              <ul className="space-y-1">
                {languages.map((item) => (
                  <li className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-4" key={item.id}>
                    {item.language} <span className="text-[0.9375rem] text-muted-foreground">{item.proficiency}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </Section>
  );
};

export default BackgroundSection;
