'use client';

import { type MotionValue, motion, useTransform } from 'motion/react';

import { useDrive } from '@/components/common/drive';
import { Gear } from '@/components/common/Gear';
import { ring } from '@/components/common/ring';

// Belt centre-line radius around the largest pulley (px). The links travel at the pulley's rim speed.
// Smaller screens scale the pulley (40px, 80px) and keep the speed.
const RADIUS = 130;

const Strand = ({ offset, y1, y2 }: { offset: MotionValue<number>; y1: string; y2: string }) => (
  <g>
    <line
      className="stroke-inchiostro [stroke-width:6px] md:[stroke-width:11px] xl:[stroke-width:18px]"
      x1="0"
      x2="100%"
      y1={y1}
      y2={y2}
    />
    <motion.line
      className="stroke-girasole [stroke-dasharray:2_14] [stroke-width:3px] md:[stroke-dasharray:3_18] md:[stroke-width:4px] xl:[stroke-dasharray:4_24] xl:[stroke-width:6px]"
      strokeLinecap="round"
      style={{ strokeDashoffset: offset }}
      x1="0"
      x2="100%"
      y1={y1}
      y2={y2}
    />
  </g>
);

// The timeline axis drawn as a belt drive: a roller at the first year, the pulley at today, half of it
// rising into the field above. Scrolling turns the pulley and runs the belt links towards the present.
export const Conveyor = ({ ticks }: { ticks: { label: number; left: number }[] }) => {
  const drive = useDrive();
  const forward = useTransform(drive, (a) => (-a * Math.PI * RADIUS) / 180);
  const backward = useTransform(forward, (offset) => -offset);
  const last = ticks.length - 1;

  return (
    <div aria-hidden="true" className="relative">
      <svg aria-hidden="true" className="block h-20 w-full overflow-visible md:h-40 xl:h-[260px]" fill="none">
        <Strand offset={backward} y1="100%" y2="0" />
        <Strand offset={forward} y1="100%" y2="100%" />
        <circle className="fill-inchiostro" cx="0" cy="100%" r="16" />
        <circle className="fill-girasole" cx="0" cy="100%" r="6" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -top-[3px] -right-[43px] size-[86px] md:-top-[6px] md:-right-[86px] md:size-[172px] xl:-top-[10px] xl:-right-[140px] xl:size-[280px]"
        viewBox="-140 -140 280 280"
      >
        <path className="fill-none stroke-inchiostro" d="M0 -130A130 130 0 0 1 0 130" strokeWidth="18" />
        <Gear angle={drive} className="fill-pomodoro" cx={0} cy={0} r={121} ratio={-1}>
          {ring(5, 74).map((hole) => (
            <circle className="fill-cobalto" cx={hole.x} cy={hole.y} key={`${hole.x},${hole.y}`} r="24" />
          ))}
          <circle className="fill-carta" r="34" />
          <circle className="fill-inchiostro" r="14" />
        </Gear>
      </svg>
      <span className="relative mt-4 block h-5">
        {ticks.map((tick, i) => (
          <span
            className={`type-small absolute ${i === 0 ? 'left-0' : i === last ? 'right-0' : '-translate-x-1/2'}`}
            key={tick.label}
            style={i > 0 && i < last ? { left: `${tick.left}%` } : undefined}
          >
            {tick.label}
          </span>
        ))}
      </span>
    </div>
  );
};
