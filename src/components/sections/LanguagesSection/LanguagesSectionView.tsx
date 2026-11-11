import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const WIDTH = 900;
const HEIGHT = 200;
const MID = HEIGHT / 2;
const WAVELENGTH = 225;
const MAX_AMPLITUDE = 80;
/** x of the amplitude bracket drawn on each wave. */
const BRACKET = 14;
const INKS = ['var(--color-ink)', 'var(--color-green-ink)'];

/** A sine wave one wavelength longer than the box on each side, so it can travel by one wavelength and loop. */
const sinePath = (amplitude: number) => {
  const points: string[] = [];
  for (let x = -WAVELENGTH; x <= WIDTH + WAVELENGTH; x += 5) {
    points.push(`${x},${(MID - amplitude * Math.sin((2 * Math.PI * x) / WAVELENGTH)).toFixed(2)}`);
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
    <Section figure={common('figure', { number: 4 })} id="languages" note={t('note')} title={t('title')}>
      <p className="mt-3 max-w-[62ch] text-caption text-pencil">{t('caption')}</p>

      <ul className="mt-8 grid gap-10 md:mt-12 md:gap-8">
        {languages.map((language, i) => {
          const share = Math.max(0, Math.min(100, language.level)) / 100;
          const amplitude = share * MAX_AMPLITUDE;
          const ink = INKS[i % INKS.length];
          return (
            <li
              className="wave group grid items-center gap-3 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8 xl:grid-cols-[18rem_minmax(0,1fr)]"
              key={language.id}
              style={{ '--wave-ink': ink } as CSSProperties}
            >
              <div>
                <h3 className="text-[2rem] leading-tight md:text-[2.5rem]" style={{ color: ink }}>
                  {language.language}
                </h3>
                <p className="text-lg text-graphite">{language.proficiency}</p>
                <p className="mt-1 text-2xl font-semibold text-red-pencil tabular-nums">
                  <i className="math font-normal">A</i> = {share.toFixed(2)}
                </p>
              </div>
              <svg
                aria-hidden="true"
                className="h-36 w-full overflow-hidden md:h-48"
                preserveAspectRatio="xMinYMid slice"
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              >
                {/* The band the wave fills, highlighted while the language is pointed at. */}
                <rect
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-70"
                  fill="var(--color-highlighter)"
                  height={2 * amplitude}
                  width={WIDTH}
                  x="0"
                  y={MID - amplitude}
                />
                <line
                  stroke="var(--color-pencil)"
                  strokeDasharray="6 7"
                  strokeWidth="2"
                  x1="0"
                  x2={WIDTH}
                  y1={MID}
                  y2={MID}
                />
                {[-1, 1].map((side) => (
                  <line
                    key={side}
                    stroke="var(--color-red-pencil)"
                    strokeDasharray="3 6"
                    strokeOpacity="0.6"
                    strokeWidth="1.5"
                    x1="0"
                    x2={WIDTH}
                    y1={MID + side * amplitude}
                    y2={MID + side * amplitude}
                  />
                ))}
                <path
                  className="wave-path"
                  d={sinePath(amplitude)}
                  fill="none"
                  stroke={ink}
                  strokeLinecap="round"
                  strokeWidth="6"
                  style={{ '--wave-period': `${7 + i * 2}s`, '--wavelength': `${WAVELENGTH}px` } as CSSProperties}
                />
                {/* Amplitude, measured from the axis to the crest. */}
                <path
                  d={`M${BRACKET},${MID}V${MID - amplitude}M${BRACKET - 8},${MID - amplitude + 14}L${BRACKET},${MID - amplitude}L${BRACKET + 8},${MID - amplitude + 14}M${BRACKET - 10},${MID}h20`}
                  fill="none"
                  stroke="var(--color-red-pencil)"
                  strokeLinecap="round"
                  strokeWidth="4"
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
