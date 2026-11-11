import type { ReactNode } from 'react';

import { ring } from '@/components/common/ring';

// The parts of one wheel, drawn around (0, 0) and stacked in this order. Each technical skill category
// is one part; `radius` is how far the part reaches from the centre.
export const wheelParts: { key: string; radius: number; shape: ReactNode }[] = [
  {
    key: 'gear',
    radius: 108,
    shape: (
      <>
        <circle className="fill-pomodoro" r="88" />
        {ring(16, 98).map((t) => (
          <circle className="fill-inchiostro" cx={t.x} cy={t.y} key={`${t.x},${t.y}`} r="10" />
        ))}
      </>
    ),
  },
  { key: 'ring', radius: 81, shape: <circle className="fill-none stroke-cobalto" r="70" strokeWidth="22" /> },
  { key: 'spoke', radius: 84, shape: <rect className="fill-abete" height="22" rx="11" width="168" x="-84" y="-11" /> },
  {
    key: 'bolts',
    radius: 55,
    shape: (
      <g className="fill-inchiostro">
        {ring(6, 47, Math.PI / 6).map((t) => (
          <circle cx={t.x} cy={t.y} key={`${t.x},${t.y}`} r="8" />
        ))}
      </g>
    ),
  },
  { key: 'disc', radius: 33, shape: <circle className="fill-carta stroke-inchiostro" r="30" strokeWidth="6" /> },
  {
    key: 'hub',
    radius: 15,
    shape: (
      <>
        <circle className="fill-inchiostro" r="15" />
        <circle className="fill-girasole" r="6" />
      </>
    ),
  },
];

// The part as a marker beside its category, scaled to fill the marker.
export const WheelPart = ({ index, className }: { index: number; className?: string }) => {
  const { radius, shape } = wheelParts[index % wheelParts.length];
  return (
    <svg aria-hidden="true" className={className} viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}>
      {shape}
    </svg>
  );
};
