import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const EducationSection = async () => {
  const [education, t] = await Promise.all([getLocalizedCollection('education'), getTranslations('Education')]);
  if (education.length === 0) return null;

  return (
    <Section id="education" title={t('title')}>
      <ul className="flex flex-col gap-5">
        {education.map((entry) => (
          <li className="doc-columns gap-y-1" key={entry.id}>
            <p className="font-mono text-base leading-relaxed">{entry.period.replace(/\s*[-–]\s*/, ' – ')}</p>
            <div>
              <h3 className="font-bold text-balance">{entry.degree}</h3>
              <p className="text-muted-foreground">{entry.institution}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default EducationSection;
