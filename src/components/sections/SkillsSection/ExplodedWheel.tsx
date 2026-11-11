'use client';

import { type MotionStyle, type MotionValue, motion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';
import { useRef } from 'react';

import { useArrival, useDrive } from '@/components/common/drive';

import { wheelParts } from './wheelParts';

// The wheel sits on the field's top edge (y = 0). Exploded, each part moves out along one axis, by a
// distance that keeps neighbours apart: left and slightly down on wide screens, and straight left along
// the edge otherwise.
const ANCHOR = { x: 650, y: 10 };
const WIDTH = 760;
const GAP = 10;
const DISTANCES: number[] = [];
for (const [i, part] of wheelParts.entries()) {
  DISTANCES.push(i === 0 ? 0 : DISTANCES[i - 1] + wheelParts[i - 1].radius + part.radius + GAP);
}
const SLOPE = { x: -0.97, y: 0.08 };
// How far the parts reach above and below the edge in either layout. The drawing is cropped to that, so
// its box reserves the room below the edge and the field's content starts clear of every part.
const ABOVE = Math.max(...wheelParts.map((part) => part.radius - ANCHOR.y));
const BELOW = Math.max(...wheelParts.map((part, i) => ANCHOR.y + DISTANCES[i] * SLOPE.y + part.radius));

const Part = ({ index, shape, drive }: { index: number; shape: ReactNode; drive: MotionValue<number> }) => {
  const distance = DISTANCES[index];
  const offsets = {
    '--edge-x': -distance,
    '--wide-x': distance * SLOPE.x,
    '--wide-y': distance * SLOPE.y,
  } as CSSProperties;
  return (
    <g className="exploded-part" style={offsets}>
      <g transform={`translate(${ANCHOR.x} ${ANCHOR.y})`}>
        <g className="mech-lift pointer-events-auto">
          <motion.g style={{ rotate: drive, transformBox: 'fill-box', transformOrigin: 'center' }}>{shape}</motion.g>
        </g>
      </g>
    </g>
  );
};

// An exploded view of a wheel, one part per skill category. The wheel arrives whole on the edge of the
// field and comes apart along a dashed axis as the field scrolls into view; every part turns with the page.
export const ExplodedWheel = ({ count }: { count: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const arrival = useArrival(ref);
  const drive = useDrive();
  const last = DISTANCES[Math.min(count, wheelParts.length) - 1];

  return (
    <div aria-hidden="true" className="pointer-events-none ml-auto w-full max-w-[52rem]" ref={ref}>
      <motion.svg
        className="block h-auto w-full overflow-visible"
        style={{ '--p': arrival, marginTop: `${(-ABOVE / WIDTH) * 100}%` } as MotionStyle}
        viewBox={`0 ${-ABOVE} ${WIDTH} ${ABOVE + BELOW}`}
      >
        <g className="stroke-inchiostro" strokeDasharray="2 16" strokeLinecap="round" strokeWidth="6">
          <line
            className="max-wide:hidden"
            x1={ANCHOR.x}
            x2={ANCHOR.x + last * SLOPE.x}
            y1={ANCHOR.y}
            y2={ANCHOR.y + last * SLOPE.y}
          />
          <line className="wide:hidden" x1={ANCHOR.x} x2={ANCHOR.x - last} y1={ANCHOR.y} y2={ANCHOR.y} />
        </g>
        {wheelParts.slice(0, count).map((part, index) => (
          <Part drive={drive} index={index} key={part.key} shape={part.shape} />
        ))}
      </motion.svg>
    </div>
  );
};
