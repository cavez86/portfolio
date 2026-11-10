import { getTranslations } from 'next-intl/server';

import Section, { SectionHeading } from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

const LAMPS = 5;

const LanguagesSection = async () => {
  const [languagesData, t] = await Promise.all([getLocalizedCollection('languages'), getTranslations('Languages')]);

  return (
    <Section heading={<SectionHeading description={t('description')} title={t('title')} />} id="languages">
      <ul className="border-t border-border">
        {languagesData.map((lang) => {
          const lit = Math.round((lang.level / 100) * LAMPS);
          return (
            <li className="flex items-center justify-between gap-6 border-b border-border py-5" key={lang.id}>
              <div>
                <h3 className="text-xl font-semibold">{lang.language}</h3>
                <p className="text-muted-foreground">{lang.proficiency}</p>
              </div>
              <div aria-hidden="true" className="flex shrink-0 gap-2">
                {Array.from({ length: LAMPS }, (_, i) => (
                  <span
                    className={cn('size-3 rounded-full', i < lit ? 'bg-primary' : 'border-2 border-border')}
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decorative scale
                    key={i}
                  />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default LanguagesSection;
