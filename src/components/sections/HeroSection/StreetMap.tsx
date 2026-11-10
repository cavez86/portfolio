import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

/**
 * Stylised map of a grid city cut by a river: straight streets, one bend of water, lamps at the corners.
 * It is deterministic (no randomness) and never traced from a real map. Decorative only.
 */

type Variant = 'wide' | 'tall';

interface MapSpec {
  width: number;
  height: number;
  /** x position of every north-south street */
  columns: number[];
  /** y position of every east-west street */
  rows: number[];
  /** x of the river centre line at a given y */
  riverX: (y: number) => number;
  /** indices of the east-west streets that cross the river on a bridge */
  bridges: number[];
  labels: { text: string; x: number; y: number; rotate?: number }[];
}

const range = (count: number, start: number, step: number) => Array.from({ length: count }, (_, i) => start + i * step);

const SPECS: Record<Variant, MapSpec> = {
  tall: {
    bridges: [3, 7, 10],
    columns: range(7, 18, 58),
    height: 840,
    labels: [
      { text: 'Fiume Po', x: 0, y: 0 },
      { text: 'Via Roma', x: 24, y: 164 },
    ],
    riverX: (y) => 255 + 62 * Math.sin(y / 120) - 0.16 * y,
    rows: range(14, 26, 62),
    width: 390,
  },
  wide: {
    bridges: [2, 5, 8],
    columns: range(16, 40, 92),
    height: 800,
    labels: [
      { text: 'Fiume Po', x: 0, y: 0 },
      { text: 'Via Roma', x: 1180, y: 186 },
      { text: 'Corso Vittorio Emanuele II', x: 960, y: 700 },
    ],
    riverX: (y) => 1010 + 140 * Math.sin(y / 140) - 0.3 * y,
    rows: range(11, 30, 78),
    width: 1440,
  },
};

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const round = (n: number) => Math.round(n * 10) / 10;

const lampDelay = (x: number, width: number, seed: number) => round(0.35 + (x / width) * 1.5 + hash(seed) * 0.45);

const StreetMap = ({ variant, className }: { variant: Variant; className?: string }) => {
  const { width, height, columns, rows, riverX, bridges, labels } = SPECS[variant];
  const id = `map-${variant}`;

  // Streets are not all the same length: some stop short, like a real, uneven plan.
  const columnSpans = columns.map((_, i) => ({
    from: hash(i + 1) < 0.3 ? round(hash(i + 9) * height * 0.3) : -10,
    to: hash(i + 2) < 0.3 ? round(height - hash(i + 5) * height * 0.3) : height + 10,
  }));
  const rowSpans = rows.map((_, j) => ({
    from: hash(j + 21) < 0.25 ? round(hash(j + 29) * width * 0.25) : -10,
    to: hash(j + 22) < 0.25 ? round(width - hash(j + 25) * width * 0.25) : width + 10,
  }));

  const riverPoints = range(Math.ceil((height + 120) / 10), -60, 10).map((y) => `${round(riverX(y))},${y}`);
  const riverPath = `M${riverPoints.join('L')}`;

  const lamps: { x: number; y: number; d: number }[] = [];
  rows.forEach((y, j) => {
    columns.forEach((x, i) => {
      const onColumn = y >= columnSpans[i].from && y <= columnSpans[i].to;
      const onRow = x >= rowSpans[j].from && x <= rowSpans[j].to;
      const nearRiver = Math.abs(x - riverX(y)) < 38;
      if (onColumn && onRow && !nearRiver && hash(i * 31 + j * 7) > 0.4) {
        lamps.push({ d: lampDelay(x, width, i * 13 + j), x, y });
      }
    });
  });

  const labelProps = (label: (typeof labels)[number]) => {
    if (label.text === 'Fiume Po') {
      const y = variant === 'wide' ? 400 : 300;
      return { ...label, rotate: 90, x: riverX(y) + 5, y };
    }
    return label;
  };

  return (
    <svg
      aria-hidden="true"
      className={cn('absolute inset-0 size-full', className)}
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#f4ab3d" stopOpacity="0.42" />
          <stop offset="1" stopColor="#f4ab3d" stopOpacity="0" />
        </radialGradient>
        <mask height={height} id={`${id}-mask`} maskUnits="userSpaceOnUse" width={width} x="0" y="0">
          <rect fill="#fff" height={height} width={width} />
          <path d={riverPath} fill="none" stroke="#000" strokeWidth="52" />
          {bridges.map((j) => {
            const y = rows[j];
            return <line key={j} stroke="#fff" strokeWidth="8" x1={riverX(y) - 44} x2={riverX(y) + 44} y1={y} y2={y} />;
          })}
        </mask>
      </defs>

      <g mask={`url(#${id}-mask)`}>
        <g className="stroke-border" fill="none">
          {columns.map((x, i) => (
            <line
              key={`c${x}`}
              strokeWidth={i % 4 === 2 ? 3 : 1.5}
              x1={x}
              x2={x}
              y1={columnSpans[i].from}
              y2={columnSpans[i].to}
            />
          ))}
          {rows.map((y, j) => (
            <line
              key={`r${y}`}
              strokeWidth={j % 4 === 1 ? 3 : 1.5}
              x1={rowSpans[j].from}
              x2={rowSpans[j].to}
              y1={y}
              y2={y}
            />
          ))}
        </g>

        <g className="stroke-primary" fill="none" opacity="0.34">
          {columns.map((x, i) => (
            <line
              className="street-lit"
              key={`lc${x}`}
              strokeWidth={i % 4 === 2 ? 3 : 1.5}
              style={{ '--d': `${round(0.3 + (i / columns.length) * 1.5)}s` } as CSSProperties}
              x1={x}
              x2={x}
              y1={columnSpans[i].from}
              y2={columnSpans[i].to}
            />
          ))}
          {rows.map((y, j) => (
            <line
              className="street-lit"
              key={`lr${y}`}
              strokeWidth={j % 4 === 1 ? 3 : 1.5}
              style={{ '--d': `${round(0.3 + (j / rows.length) * 1.5)}s` } as CSSProperties}
              x1={rowSpans[j].from}
              x2={rowSpans[j].to}
              y1={y}
              y2={y}
            />
          ))}
        </g>

        {lamps.map(({ x, y, d }) => (
          <g key={`${x}-${y}`} style={{ '--d': `${d}s` } as CSSProperties}>
            <circle className="lamp" cx={x} cy={y} fill={`url(#${id}-glow)`} r="24" />
            <circle className="lamp fill-primary" cx={x} cy={y} r="3.2" />
          </g>
        ))}
      </g>

      <path d={riverPath} fill="none" stroke="#6cbab4" strokeOpacity="0.75" strokeWidth="42" />
      <path d={riverPath} fill="none" stroke="#1d3b42" strokeWidth="37" />

      <g className="fill-muted-foreground" fontSize="13" fontStyle="italic" opacity="0.75">
        {labels.map((label) => {
          const l = labelProps(label);
          return (
            <text key={l.text} transform={l.rotate ? `rotate(${l.rotate} ${l.x} ${l.y})` : undefined} x={l.x} y={l.y}>
              {l.text}
            </text>
          );
        })}
      </g>
    </svg>
  );
};

export default StreetMap;
