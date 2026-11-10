import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Proficiency as the share of a full turn: a closed ring is native.
const Proficiency = ({ label, level }: { label: string; level: number }) => {
  const share = Math.min(Math.max(level, 0), 100) / 100;
  return (
    <svg aria-label={label} className="aspect-square w-full max-w-52" role="img" viewBox="0 0 180 180">
      <circle cx="90" cy="90" fill="none" r={RADIUS} stroke="currentColor" strokeOpacity="0.28" strokeWidth="26" />
      <circle
        cx="90"
        cy="90"
        fill="none"
        r={RADIUS}
        stroke="var(--color-girasole)"
        strokeDasharray={`${share * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        strokeWidth="26"
        transform="rotate(-90 90 90)"
      />
      <circle cx="90" cy="90" fill="var(--color-pomodoro)" r="12" />
    </svg>
  );
};

const LanguagesSection = async () => {
  const [languagesData, t] = await Promise.all([getLocalizedCollection('languages'), getTranslations('Languages')]);

  return (
    <Section field="abete">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <div>
          <h2 className="type-title">{t('title')}</h2>
          <p className="type-lead mt-6 max-w-[28ch]">{t('description')}</p>
        </div>
        <ul className="grid grid-cols-2 content-center gap-x-6 gap-y-12 lg:gap-x-12">
          {languagesData.map((lang) => (
            <li className="flex flex-col items-start gap-5" key={lang.id}>
              <Proficiency label={`${lang.language}: ${lang.proficiency}`} level={lang.level} />
              <div>
                <h3 className="type-heading">{lang.language}</h3>
                <p className="mt-1 max-w-[22ch] font-semibold">{lang.proficiency}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default LanguagesSection;
