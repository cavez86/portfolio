'use client';

import { type MotionValue, motion, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

import { ring } from './ring';

// Shared by every drawn piece: a disc with dot teeth on a pitch ring, turning on its centre.
// `ratio` is turns per turn of the driving angle; two meshed gears use -pitchA / pitchB.
// Anything passed as children is drawn around (0, 0) and turns with the gear.
export const Gear = ({
  angle,
  ratio = 1,
  cx,
  cy,
  r,
  teeth = 0,
  pitch = r + 20,
  tooth = 12,
  phase = 0,
  className,
  teethClassName = 'fill-inchiostro',
  children,
}: {
  angle: MotionValue<number>;
  ratio?: number;
  cx: number;
  cy: number;
  r: number;
  teeth?: number;
  pitch?: number;
  tooth?: number;
  phase?: number;
  className?: string;
  teethClassName?: string;
  children?: ReactNode;
}) => {
  const rotate = useTransform(angle, (a) => a * ratio);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <motion.g style={{ rotate, transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle className={className} r={r} />
        <g className={teethClassName}>
          {ring(teeth, pitch, phase).map((t) => (
            <circle cx={t.x} cy={t.y} key={`${t.x},${t.y}`} r={tooth} />
          ))}
        </g>
        {children}
      </motion.g>
    </g>
  );
};
