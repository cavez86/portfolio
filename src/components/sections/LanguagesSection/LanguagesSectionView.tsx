import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const WIDTH = 640;
const HEIGHT = 120;
const WAVELENGTH = 160;
const MAX_AMPLITUDE = 50;
const INKS = ['var(--color-ink)', 'var(--color-green-ink)'];

/** A sine wave one wavelength longer than the box on each side, so it can travel by one wavelength and loop. */
const sinePath = (amplitude: number) => {
  const points: string[] = [];
  for (let x = -WAVELENGTH; x <= WIDTH + WAVELENGTH; x += 4) {
    points.push(`${x},${(HEIGHT / 2 - amplitude * Math.sin((2 * Math.PI * x) / WAVELENGTH)).toFixed(2)}`);
  }
  return `M${points.join('L')}`;
};

const LanguagesSection = async () => {
  const [languages, t, common] = await Promise.all([
    getLocalizedCollection('languages'),
    getTranslations('Languages'),
    getTranslations('Common'),
  ]);

  return (
    <Section figure={common('figure', { number: 4 })} id="languages" title={t('title')}>
      <p className="mt-3 max-w-[62ch] text-caption text-pencil">{t('caption')}</p>

      <ul className="mt-8 grid gap-8 md:mt-12 md:gap-6">
        {languages.map((language, i) => {
          const share = Math.max(0, Math.min(100, language.level)) / 100;
          const amplitude = share * MAX_AMPLITUDE;
          const ink = INKS[i % INKS.length];
          return (
            <li
              className="wave group grid items-center gap-2 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8"
              key={language.id}
            >
              <div>
                <h3 className="text-[1.75rem] leading-tight md:text-[2rem]" style={{ color: ink }}>
                  {language.language}
                </h3>
                <p className="text-graphite">{language.proficiency}</p>
                <p className="text-caption text-pencil tabular-nums">
                  <i className="math">A</i> = {share.toFixed(2)}
                </p>
              </div>
              <svg
                aria-hidden="true"
                className="h-24 w-full overflow-hidden md:h-30"
                preserveAspectRatio="xMinYMid slice"
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              >
                <line
                  stroke="var(--color-pencil)"
                  strokeDasharray="4 6"
                  strokeWidth="1.5"
                  x1="0"
                  x2={WIDTH}
                  y1={HEIGHT / 2}
                  y2={HEIGHT / 2}
                />
                {[-1, 1].map((side) => (
                  <line
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    key={side}
                    stroke="var(--color-red-pencil)"
                    strokeDasharray="2 5"
                    strokeWidth="1.5"
                    x1="0"
                    x2={WIDTH}
                    y1={HEIGHT / 2 + side * amplitude}
                    y2={HEIGHT / 2 + side * amplitude}
                  />
                ))}
                <path
                  className="wave-path"
                  d={sinePath(amplitude)}
                  fill="none"
                  stroke={ink}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  style={{ '--wave-period': `${3 + i}s`, '--wavelength': `${WAVELENGTH}px` } as React.CSSProperties}
                />
              </svg>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default LanguagesSection;
