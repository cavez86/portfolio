'use client';

import { useTranslations } from 'next-intl';
import { type CSSProperties, useState } from 'react';

const WIDTH = 900;
const HEIGHT = 120;
const MID = HEIGHT / 2;
const WAVELENGTH = 225;
const MAX_AMPLITUDE = 48;

/** A sine wave one wavelength longer than the box, so it can travel by one wavelength and end where it began. */
const sinePath = (amplitude: number) => {
  const points: string[] = [];
  for (let x = 0; x <= WIDTH + WAVELENGTH; x += 5) {
    points.push(`${x},${(MID - amplitude * Math.sin((2 * Math.PI * x) / WAVELENGTH)).toFixed(2)}`);
  }
  return `M${points.join('L')}`;
};

/** A wave with amplitude in proportion to the level (native = 100). It travels only when pressed. */
export function Wave({ level, name }: { level: number; name: string }) {
  const t = useTranslations('Languages');
  const [run, setRun] = useState(0);
  const amplitude = (Math.max(0, Math.min(100, level)) / 100) * MAX_AMPLITUDE;

  return (
    <button
      aria-label={t('play', { language: name })}
      className="block w-full cursor-pointer rounded-sm"
      onClick={() => setRun((count) => count + 1)}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="h-24 w-full overflow-hidden md:h-28"
        preserveAspectRatio="xMinYMid slice"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <path
          className={run > 0 ? 'wave-path' : undefined}
          d={sinePath(amplitude)}
          fill="none"
          key={run}
          stroke="var(--color-ink)"
          strokeLinecap="round"
          strokeWidth="3.5"
          style={{ '--wavelength': `${WAVELENGTH}px` } as CSSProperties}
        />
      </svg>
    </button>
  );
}
