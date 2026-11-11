'use client';

import { motion, useTransform } from 'motion/react';
import { useRef } from 'react';

import { useArrival } from '@/components/common/drive';
import { ring } from '@/components/common/ring';

// The dial sweeps 270 degrees, from bottom left (0) clockwise to bottom right (100).
const START = 135;
const SWEEP = 270;
const STEPS = 10;
const SCALE_RADIUS = 128;
const ARC_RADIUS = 96;

const polar = (deg: number, radius: number) => {
  const rad = (deg * Math.PI) / 180;
  return `${(radius * Math.cos(rad)).toFixed(2)} ${(radius * Math.sin(rad)).toFixed(2)}`;
};

// Proficiency as a gauge: the yellow arc and the lit scale dots show the level, and the needle swings
// up to it as the field scrolls into view.
export const Gauge = ({ label, level }: { label: string; level: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const arrival = useArrival(ref);
  const share = Math.min(Math.max(level, 0), 100) / 100;
  const end = START + SWEEP * share;
  const needle = useTransform(arrival, (p) => START + SWEEP * share * p + 90);
  const scale = ring(STEPS * 4, SCALE_RADIUS, (START * Math.PI) / 180).slice(0, STEPS * 3 + 1);

  return (
    <div className="mech-lift size-36 shrink-0 sm:size-44 md:size-64" ref={ref}>
      <svg aria-label={label} className="size-full overflow-visible" role="img" viewBox="-150 -150 300 300">
        <circle className="fill-inchiostro" r="150" />
        {scale.map((dot, i) => (
          <circle
            className={i / (STEPS * 3) <= share ? 'fill-girasole' : 'fill-carta'}
            cx={dot.x}
            cy={dot.y}
            key={`${dot.x},${dot.y}`}
            r={i % 3 === 0 ? 8 : 4}
          />
        ))}
        <path
          className="fill-none stroke-carta/25"
          d={`M${polar(START, ARC_RADIUS)}A${ARC_RADIUS} ${ARC_RADIUS} 0 1 1 ${polar(START + SWEEP, ARC_RADIUS)}`}
          strokeWidth="26"
        />
        <path
          className="fill-none stroke-girasole"
          d={`M${polar(START, ARC_RADIUS)}A${ARC_RADIUS} ${ARC_RADIUS} 0 ${end - START > 180 ? 1 : 0} 1 ${polar(end, ARC_RADIUS)}`}
          strokeWidth="26"
        />
        <motion.g style={{ rotate: needle, transformBox: 'fill-box', transformOrigin: 'center' }}>
          {/* An invisible counterpart keeps the box centred on the hub, so the needle turns about it. */}
          <rect className="fill-none" height="224" width="18" x="-9" y="-112" />
          <rect className="fill-pomodoro" height="112" rx="9" width="18" x="-9" y="-112" />
        </motion.g>
        <circle className="fill-carta" r="24" />
        <circle className="fill-inchiostro" r="9" />
      </svg>
    </div>
  );
};
