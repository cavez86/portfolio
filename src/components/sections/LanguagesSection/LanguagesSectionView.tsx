import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Proficiency as the share of a full turn: a closed ring is native.
const Proficiency = ({ label, level }: { label: string; level: number }) => {
  const share = Math.min(Math.max(level, 0), 100) / 100;
  return (
    <svg aria-label={label} className="size-28 shrink-0 md:size-32" role="img" viewBox="0 0 180 180">
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
    <Section compact field="abete">
      <h2 className="type-title">{t('title')}</h2>
      <ul className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {languagesData.map((lang) => (
          <li className="flex items-center gap-5" key={lang.id}>
            <Proficiency label={`${lang.language}: ${lang.proficiency}`} level={lang.level} />
            <div>
              <h3 className="type-heading">{lang.language}</h3>
              <p className="mt-1 max-w-[22ch] font-semibold">{lang.proficiency}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default LanguagesSection;
