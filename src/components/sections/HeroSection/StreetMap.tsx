import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

import {
  bankAt,
  insideRect,
  letteringClearings,
  type MapSpec,
  type Point,
  riverBanks,
  round,
  SPECS,
  toPath,
  type Variant,
} from './cityMap';

/** Deterministic noise, so the server and the client draw the same city. */
const hash = (x: number, y: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

const insidePolygon = ([x, y]: Point, polygon: Point[]) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

/** The light spreads with an ease-out; a lamp switches on when the front reaches it. */
const SPREAD_START = 0.2;
const SPREAD_DURATION = 2.4;
const lampDelay = (distance: number, reach: number) =>
  round(SPREAD_START + SPREAD_DURATION * (1 - (1 - Math.min(distance / reach, 1)) ** 0.45), 2);

/** Window light: mostly warm lamps, some paler, the odd television blue-green. */
const WINDOW_COLOURS = [
  'fill-[#ffcf7a]',
  'fill-[#ffcf7a]',
  'fill-[#ffcf7a]',
  'fill-[#ffcf7a]',
  'fill-[#ffe2b0]',
  'fill-[#8fe3d8]',
];

const buildMap = (spec: MapSpec, name: string) => {
  const { width: W, height: H } = spec;
  const scale = W / 1440 + 0.5 * (1 - W / 1440); // thinner lines on the small map, but not proportionally thinner
  const banks = riverBanks(spec);
  const city: Point[] = [[-40, -40], ...banks.west, ...spec.westClose];
  const water: Point[] = [...banks.west, ...[...banks.east].reverse()];
  const clearings = letteringClearings(spec, name);

  const blocked = (p: Point, margin = 6) =>
    !insidePolygon(p, city) ||
    clearings.some((r) => insideRect(p, r, margin)) ||
    spec.piazzas.some((r) => insideRect(p, r, -2)) ||
    (spec.park ? insidePolygon(p, spec.park) : false) ||
    p[0] < 0 ||
    p[0] > W ||
    p[1] < 0 ||
    p[1] > H;

  // Streets run between crossings; a few minor stretches are missing, so blocks merge into larger ones.
  const stretches = (
    at: number[],
    cuts: number[],
    major: number[],
    line: (a: number, from: number, to: number) => string
  ) =>
    at.map((a) => {
      const ends = [-20, ...cuts, cuts === spec.rows ? H + 20 : W + 20];
      const isMajor = major.includes(a);
      const d = ends
        .slice(1)
        .map((to, i) => [ends[i], to])
        .filter(([from]) => isMajor || hash(a, from) > 0.2)
        .map(([from, to]) => line(a, from, to))
        .join('');
      return { d, major: isMajor };
    });

  const streets = [
    ...stretches(spec.columns, spec.rows, spec.corsi.columns, (x, from, to) => `M${x},${from}V${to}`),
    ...stretches(spec.rows, spec.columns, spec.corsi.rows, (y, from, to) => `M${from},${y}H${to}`),
    ...spec.diagonals.map(([a, b]) => ({ d: toPath([a, b]), major: true })),
    { d: toPath(banks.lungo), major: true },
  ].filter(({ d }) => d);

  const bridges = spec.river.bridges.map((y) => {
    const x1 = bankAt(banks.west, y);
    const x2 = bankAt(banks.east, y);
    return { x1: round(x1), x2: round(x2), y };
  });

  // Lamps line the corsi and the bridges; ordinary streets stay dark.
  const candidates: Point[] = [
    ...spec.corsi.columns.flatMap((x) => spec.rows.map((y): Point => [x, y])),
    ...spec.corsi.rows.flatMap((y) => spec.columns.map((x): Point => [x, y])),
    ...spec.diagonals.flatMap(([a, b]) =>
      [0.2, 0.5, 0.8].map((t): Point => [round(a[0] + (b[0] - a[0]) * t), round(a[1] + (b[1] - a[1]) * t)])
    ),
    ...spec.piazzas.flatMap(({ x, y, w, h }): Point[] => [
      [x, y],
      [x + w, y],
      [x, y + h],
      [x + w, y + h],
    ]),
  ];
  const { name: n } = spec.lettering;
  const origin: Point = [n.x + n.size * 2.2, n.y + n.size * 0.9];
  const reach = Math.max(...[0, W].flatMap((x) => [0, H].map((y) => Math.hypot(x - origin[0], y - origin[1]))));
  const seen = new Set<string>();
  const lamps = [
    ...candidates.filter((p) => !blocked(p) && hash(p[0], p[1]) > 0.3),
    ...bridges.flatMap(({ x1, x2, y }): Point[] => [
      [x1 - 4, y],
      [x2 + 4, y],
    ]),
  ]
    .filter(([x, y]) => {
      const key = `${x},${y}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(([x, y]) => ({ d: lampDelay(Math.hypot(x - origin[0], y - origin[1]), reach), x, y }));

  // Lit windows: short rows along the facades inside each block, so the city reads as awake. A few switch on and off.
  const pitch = 6.5 * scale;
  const windows = spec.columns
    .slice(0, -1)
    .flatMap((x0, i) =>
      spec.rows.slice(0, -1).flatMap((y0, j) => {
        const [x1, y1] = [spec.columns[i + 1], spec.rows[j + 1]];
        const inset = 7 * scale;
        return Array.from({ length: Math.floor(hash(x0, y0) * 3) }, (_, k) => {
          const along = hash(x0 + k * 7.1, y0 + k * 3.3);
          const side = hash(y0 + k, x0 - k);
          const top = side < 0.5;
          const startX = x0 + inset + along * Math.max(x1 - x0 - inset * 2 - pitch * 3, 0);
          const y = top ? y0 + inset : y1 - inset;
          const colour = WINDOW_COLOURS[Math.floor(hash(k, x0 + y0) * WINDOW_COLOURS.length)];
          return Array.from({ length: 2 + (Math.floor(side * 6) % 3) }, (_, w) => ({
            colour,
            twinkle: hash(x0 * w + 1, y0 + k) > 0.93,
            x: round(startX + w * pitch),
            y: round(y),
          }));
        }).flat();
      })
    )
    .filter(({ x, y }) => !blocked([x, y], 3));

  return { banks, bridges, city, clearings, H, lamps, origin, reach, scale, streets, W, water, windows };
};

const StreetMap = ({ variant, name, className }: { variant: Variant; name: string; className?: string }) => {
  const spec = SPECS[variant];
  const { banks, bridges, city, clearings, H, lamps, origin, reach, scale, streets, W, water, windows } = buildMap(
    spec,
    name
  );
  const id = `map-${variant}`;
  const thin = 1.5 * scale;
  const thick = 4.5 * scale;
  const tramWidth = spec.tram.width;
  const labelSize = { place: 14, street: 13, water: 16 };

  const streetLayer = (stroke: string, lit: boolean) => (
    <g className={stroke} fill="none" strokeLinecap="square">
      {streets.map(({ d, major }) => (
        <path d={d} key={d} opacity={lit ? (major ? 0.95 : 0.4) : 1} strokeWidth={major ? thick : thin} />
      ))}
    </g>
  );

  const hillLayer = (stroke: string, lit: boolean) => (
    <g className={stroke} fill="none" opacity={lit ? 0.6 : 1} strokeWidth={thin * 1.3}>
      {spec.hillRoads.map((d) => (
        <path d={d} key={d} />
      ))}
    </g>
  );

  const piazzaLayer = (stroke: string) => (
    <g className={stroke} fill="none" strokeDasharray={`${2.5 * scale} ${5 * scale}`} strokeWidth={2.5 * scale}>
      {spec.piazzas.map(({ x, y, w, h }) => (
        <rect height={h - 12} key={`${x},${y}`} width={w - 12} x={x + 6} y={y + 6} />
      ))}
    </g>
  );

  return (
    <svg
      aria-hidden="true"
      className={cn('absolute inset-0 size-full', className)}
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
    >
      <defs>
        <clipPath id={`${id}-city`}>
          <path d={toPath(city, true)} />
        </clipPath>
        <mask height={H} id={`${id}-yield`} maskUnits="userSpaceOnUse" width={W} x="0" y="0">
          <rect fill="#fff" height={H} width={W} />
          {[...clearings, ...spec.piazzas].map(({ x, y, w, h }) => (
            <rect fill="#000" height={h} key={`${x},${y},${w}`} width={w} x={x} y={y} />
          ))}
          {spec.park && <path d={toPath(spec.park, true)} fill="#000" />}
        </mask>
        <radialGradient id={`${id}-light`}>
          <stop offset="0.9" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask height={H} id={`${id}-lit`} maskUnits="userSpaceOnUse" width={W} x="0" y="0">
          <circle
            className="light-spread"
            cx={round(origin[0])}
            cy={round(origin[1])}
            fill={`url(#${id}-light)`}
            r={round(reach * 1.12)}
          />
        </mask>
      </defs>

      {/* The hill across the river: no grid, roads follow the slope. */}
      <path
        className="fill-[#24152a]"
        d={`M-40,-40H${W + 40}V${H + 40}H-40Z${toPath(city, true)}`}
        fillRule="evenodd"
      />
      {hillLayer('stroke-street', false)}
      <g mask={`url(#${id}-lit)`}>{hillLayer('stroke-lampione', true)}</g>

      {spec.park && (
        <g>
          <path className="fill-po" d={toPath(spec.park, true)} opacity="0.55" />
          <path
            className="stroke-riva"
            d={`M${spec.park[0][0] + 20},${spec.park[0][1] + 40} C${spec.park[0][0] + 90},${spec.park[0][1] + 10} ${spec.park[0][0] + 120},${spec.park[0][1] + 110} ${spec.park[0][0] + 200},${spec.park[0][1] + 90}`}
            fill="none"
            strokeDasharray="1 5"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
        </g>
      )}

      {spec.piazzas.map(({ x, y, w, h }) => (
        <rect className="fill-isolato" height={h} key={`${x},${y}`} opacity="0.7" width={w} x={x} y={y} />
      ))}

      <g clipPath={`url(#${id}-city)`}>
        <g mask={`url(#${id}-yield)`}>
          {streetLayer('stroke-street', false)}
          <g mask={`url(#${id}-lit)`}>
            {streetLayer('stroke-lampione', true)}
            {windows.map(({ x, y, colour, twinkle }) => (
              <rect
                className={cn(colour, twinkle && 'twinkle')}
                height={2.6 * scale + 0.6}
                key={`${x},${y}`}
                opacity="0.85"
                style={twinkle ? ({ '--d': `${round(hash(y, x) * -9, 1)}s` } as CSSProperties) : undefined}
                width={3.4 * scale + 0.6}
                x={x - 1.7 * scale}
                y={y - 1.3 * scale}
              />
            ))}
          </g>
        </g>
        {piazzaLayer('stroke-street')}
        <g mask={`url(#${id}-lit)`} opacity="0.8">
          {piazzaLayer('stroke-lampione')}
        </g>
      </g>

      <path className="fill-po" d={toPath(water, true)} />
      <g className="stroke-riva" fill="none" strokeWidth={1.6 * scale}>
        <path d={toPath(banks.west)} />
        <path d={toPath(banks.east)} />
      </g>

      {bridges.map(({ x1, x2, y }) => {
        const flare = 6 * scale;
        const half = 4.5 * scale;
        return (
          <g key={y}>
            <rect className="fill-notte" height={half * 2} width={x2 - x1} x={x1} y={y - half} />
            <path
              className="stroke-carta"
              d={[-1, 1]
                .map(
                  (side) =>
                    `M${x1 - flare},${y + side * (half + flare)}L${x1},${y + side * half}H${x2}L${x2 + flare},${y + side * (half + flare)}`
                )
                .join('')}
              fill="none"
              strokeWidth={1.4 * scale}
            />
            <path className="stroke-street" d={`M${x1 - 30},${y}H${x2 + 40}`} strokeWidth={thick * 0.7} />
            <path
              className="stroke-lampione"
              d={`M${x1 - 30},${y}H${x2 + 40}`}
              mask={`url(#${id}-lit)`}
              strokeWidth={thick * 0.7}
            />
          </g>
        );
      })}

      {spec.landmark && (
        <g className="fill-notte stroke-carta" strokeWidth="1.5">
          <circle cx={spec.landmark[0]} cy={spec.landmark[1]} r="11" />
          <circle className="fill-carta" cx={spec.landmark[0]} cy={spec.landmark[1]} r="3" />
        </g>
      )}

      {lamps.map(({ x, y, d }) => (
        <g className="lamp" key={`${x},${y}`} style={{ '--d': `${d}s` } as CSSProperties}>
          <circle className="fill-lampione" cx={x} cy={y} opacity="0.2" r={7 * scale} />
          <circle className="fill-[#ffd28c]" cx={x} cy={y} r={2.4 * scale} />
        </g>
      ))}

      <g className="stroke-notte" paintOrder="stroke" strokeLinejoin="round" strokeWidth="4">
        {spec.labels.map(({ text, x, y, angle, kind }) => (
          <text
            className={kind === 'water' ? 'fill-riva' : 'fill-carta'}
            fillOpacity={kind === 'street' ? 0.78 : 0.92}
            fontSize={labelSize[kind] * Math.max(scale, 0.85)}
            fontStyle={kind === 'water' ? 'italic' : undefined}
            fontWeight={kind === 'water' ? 500 : 600}
            key={text}
            letterSpacing={kind === 'water' ? '0.12em' : '0.02em'}
            transform={angle ? `rotate(${angle} ${x} ${y})` : undefined}
            x={x}
            y={y}
          >
            {text}
          </text>
        ))}
      </g>

      <path
        className="stroke-tram"
        d={toPath(spec.tram.points)}
        fill="none"
        strokeDasharray={`${tramWidth * 1.8} ${tramWidth}`}
        strokeWidth={tramWidth}
      />
      <circle
        className="fill-notte stroke-tram"
        cx={spec.tram.points.at(-1)?.[0]}
        cy={spec.tram.points.at(-1)?.[1]}
        r={tramWidth * 1.1}
        strokeWidth={tramWidth * 0.55}
      />
    </svg>
  );
};

export default StreetMap;
