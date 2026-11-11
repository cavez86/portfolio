import type { CSSProperties } from 'react';

/**
 * The night map of the hero: an abstracted grid city cut by the Po. Stylised, never traced: the street names are
 * real Turin names placed for flavour. Everything is in map units; at the wide variant one unit is one CSS pixel
 * at 1440px. Two variants: `tall` for phones, `wide` from the md breakpoint.
 */

export type Variant = 'tall' | 'wide';
export type Point = [number, number];

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Label {
  text: string;
  x: number;
  y: number;
  /** degrees */
  angle?: number;
  kind: 'street' | 'water' | 'place';
}

export interface MapSpec {
  width: number;
  height: number;
  /** x of every north-south street, y of every east-west street */
  columns: number[];
  rows: number[];
  /** major streets (corsi), drawn wider and lamp-lined */
  corsi: { columns: number[]; rows: number[] };
  diagonals: [Point, Point][];
  /** open squares: streets stop at their edge, arcades run along it */
  piazzas: Rect[];
  park?: Point[];
  river: { points: Point[]; width: number; bridges: number[] };
  /** extra corners that close the land west of the river into a polygon (after the river's last point) */
  westClose: Point[];
  hillRoads: string[];
  landmark?: Point;
  labels: Label[];
  /** where the HTML lettering sits: the name lines, the title, the contact button */
  lettering: {
    name: { x: number; y: number; size: number; oneWordPerLine: boolean };
    title: { x: number; y: number; size: number; width: number };
    cta: { x: number; y: number; size: number };
  };
  /** the tram line: dashed (under construction) through the city, leaving the bottom edge at railX */
  tram: { points: Point[]; width: number };
}

/** Sofia Sans Extra Condensed 800: average advance per character, in em (measured on the real name). */
const NAME_ADVANCE = 0.345;
const NAME_LINE_HEIGHT = 0.86;
const TITLE_LINE_HEIGHT = 1.3;

export const SPECS: Record<Variant, MapSpec> = {
  tall: {
    columns: [-10, 36, 84, 128, 172, 214, 262, 304, 348, 392],
    corsi: { columns: [172], rows: [196, 712] },
    diagonals: [
      [
        [36, 300],
        [252, 112],
      ],
    ],
    height: 760,
    hillRoads: ['M330,-10 C345,30 372,40 400,36', 'M300,40 C330,60 350,90 400,96'],
    labels: [
      { angle: -90, kind: 'street', text: 'Via Roma', x: 79, y: 186 },
      { angle: -41.5, kind: 'street', text: 'Via Po', x: 120, y: 216 },
      { angle: 52, kind: 'water', text: 'Fiume Po', x: 262, y: 104 },
    ],
    lettering: {
      cta: { size: 17, x: 20, y: 650 },
      name: { oneWordPerLine: true, size: 84, x: 18, y: 328 },
      title: { size: 19, width: 340, x: 20, y: 568 },
    },
    piazzas: [{ h: 58, w: 88, x: 214, y: 240 }],
    river: {
      bridges: [64, 196],
      points: [
        [222, -40],
        [238, 50],
        [282, 140],
        [348, 210],
        [440, 262],
      ],
      width: 46,
    },
    rows: [22, 64, 112, 150, 196, 240, 298, 330, 380, 430, 480, 530, 580, 630, 676, 712, 748],
    tram: {
      points: [
        [28, 790],
        [28, 712],
        [262, 712],
      ],
      width: 8,
    },
    westClose: [
      [440, 800],
      [-40, 800],
    ],
    width: 390,
  },
  wide: {
    columns: [-10, 52, 118, 176, 250, 318, 372, 432, 498, 560, 616, 688, 742, 806, 868, 930, 990, 1050, 1110, 1170],
    corsi: { columns: [432, 868], rows: [172, 760] },
    diagonals: [
      [
        [52, 236],
        [318, 24],
      ],
      [
        [742, 236],
        [1000, 110],
      ],
    ],
    height: 820,
    hillRoads: [
      'M1240,128H1300',
      'M1300,128 C1340,122 1372,96 1460,88',
      'M1300,128 C1326,170 1358,198 1398,214 S1440,246 1460,250',
      'M1185,452 C1250,446 1292,420 1320,382 S1384,330 1460,328',
      'M1185,452 C1262,470 1302,516 1350,538 S1420,562 1460,600',
      'M1300,716 C1350,700 1402,690 1460,702',
    ],
    labels: [
      { angle: -39.6, kind: 'street', text: 'Via Pietro Micca', x: 122, y: 170 },
      { angle: -26, kind: 'street', text: 'Via Po', x: 820, y: 188 },
      { angle: -90, kind: 'street', text: 'Via Roma', x: 425, y: 150 },
      { kind: 'place', text: 'Piazza Vittorio', x: 1010, y: 140 },
      { kind: 'street', text: 'Corso Vittorio Emanuele II', x: 130, y: 752 },
      { angle: 78, kind: 'water', text: 'Fiume Po', x: 1108, y: 300 },
      { kind: 'water', text: 'Parco del Valentino', x: 1012, y: 770 },
      { kind: 'place', text: 'Gran Madre', x: 1318, y: 133 },
    ],
    landmark: [1300, 128],
    lettering: {
      cta: { size: 18, x: 124, y: 620 },
      name: { oneWordPerLine: false, size: 150, x: 116, y: 250 },
      title: { size: 26, width: 760, x: 124, y: 538 },
    },
    park: [
      [990, 680],
      [1190, 680],
      [1230, 740],
      [1262, 830],
      [990, 830],
    ],
    piazzas: [
      { h: 112, w: 150, x: 990, y: 76 },
      { h: 66, w: 116, x: 560, y: 668 },
    ],
    river: {
      bridges: [128, 452, 716],
      points: [
        [1235, -40],
        [1200, 90],
        [1150, 220],
        [1120, 360],
        [1138, 500],
        [1196, 640],
        [1262, 760],
        [1300, 870],
      ],
      width: 66,
    },
    rows: [24, 70, 128, 172, 236, 292, 340, 400, 452, 508, 560, 612, 668, 716, 760, 808],
    tram: {
      points: [
        [432, 850],
        [432, 760],
        [868, 760],
        [868, 612],
      ],
      width: 10,
    },
    westClose: [[-40, 870]],
    width: 1440,
  },
};

/** Map units as a percentage of the map's width / height. */
export const pctX = (spec: MapSpec, x: number) => `${round((x / spec.width) * 100, 3)}%`;
export const pctY = (spec: MapSpec, y: number) => `${round((y / spec.height) * 100, 3)}%`;
/** Map units as container query units (the map container is the query container). */
export const cqw = (spec: MapSpec, size: number) => `${round((size / spec.width) * 100, 3)}cqw`;

export const round = (n: number, digits = 1) => {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
};

/** Split the name into lettering lines: one word per line on the tall map, first name / surnames on the wide one. */
export const nameLines = (name: string, oneWordPerLine: boolean) => {
  const words = name.trim().split(/\s+/);
  return oneWordPerLine ? words : [words[0], words.slice(1).join(' ')].filter(Boolean);
};

/** Where the streets must yield to the lettering, padded like a piazza around it. */
export const letteringClearings = (spec: MapSpec, name: string): Rect[] => {
  const { name: n, title, cta } = spec.lettering;
  const pad = n.size * 0.14;
  const lineHeight = n.size * NAME_LINE_HEIGHT;
  const nameRects = nameLines(name, n.oneWordPerLine).map((line, i) => ({
    h: lineHeight + pad,
    w: line.length * n.size * NAME_ADVANCE + pad * 2,
    x: n.x - pad,
    y: n.y + i * lineHeight - pad * 0.4,
  }));
  return [
    ...nameRects,
    { h: title.size * TITLE_LINE_HEIGHT * 2 + pad, w: title.width + pad, x: title.x - pad, y: title.y - pad * 0.6 },
    { h: cta.size * 3.6 + pad, w: cta.size * 9 + pad * 2, x: cta.x - pad, y: cta.y - pad * 0.6 },
  ];
};

export const insideRect = ([x, y]: Point, r: Rect, margin = 0) =>
  x > r.x - margin && x < r.x + r.w + margin && y > r.y - margin && y < r.y + r.h + margin;

/** Catmull-Rom through the river's control points, sampled into a polyline. */
const sampleCurve = (points: Point[], steps = 14): Point[] => {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const at = (k: 0 | 1) =>
        0.5 *
        (2 * p1[k] +
          (-p0[k] + p2[k]) * t +
          (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 +
          (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3);
      out.push([at(0), at(1)]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
};

/** The river as two banks (`west` is the city side) plus the riverside road (lungo Po) on the city side. */
export const riverBanks = (spec: MapSpec) => {
  const centre = sampleCurve(spec.river.points);
  const half = spec.river.width / 2;
  const offset = (distance: number) =>
    centre.map(([x, y], i): Point => {
      const [ax, ay] = centre[Math.max(i - 1, 0)];
      const [bx, by] = centre[Math.min(i + 1, centre.length - 1)];
      const len = Math.hypot(bx - ax, by - ay) || 1;
      // Positive distances go east of the direction of flow.
      return [round(x + (distance * (by - ay)) / len), round(y - (distance * (bx - ax)) / len)];
    });
  return { east: offset(half), lungo: offset(-half - spec.river.width * 0.3), west: offset(-half) };
};

/** x of the river's west bank at a given y (the banks are monotonic in y for both specs). */
export const bankAt = (bank: Point[], y: number) => {
  const i = bank.findIndex(([, by]) => by >= y);
  if (i <= 0) return bank[Math.max(i, 0)][0];
  const [ax, ay] = bank[i - 1];
  const [bx, by] = bank[i];
  return ax + ((bx - ax) * (y - ay)) / (by - ay || 1);
};

export const toPath = (points: Point[], close = false) =>
  `M${points.map(([x, y]) => `${round(x)},${round(y)}`).join('L')}${close ? 'Z' : ''}`;

/** Places the HTML lettering on the map: positions and sizes in map units, as CSS custom properties. */
const letteringVars = (spec: MapSpec, suffix: string) => {
  const { name, title, cta } = spec.lettering;
  return {
    [`--map-ratio${suffix}`]: `${spec.width} / ${spec.height}`,
    [`--name-x${suffix}`]: pctX(spec, name.x),
    [`--name-y${suffix}`]: pctY(spec, name.y),
    [`--name-size${suffix}`]: cqw(spec, name.size),
    [`--title-x${suffix}`]: pctX(spec, title.x),
    [`--title-y${suffix}`]: pctY(spec, title.y),
    [`--title-size${suffix}`]: cqw(spec, title.size),
    [`--title-w${suffix}`]: cqw(spec, title.width),
    [`--cta-x${suffix}`]: pctX(spec, cta.x),
    [`--cta-y${suffix}`]: pctY(spec, cta.y),
    [`--cta-size${suffix}`]: cqw(spec, cta.size),
  };
};

/** For the hero container: the tall map below md, the wide one from md. */
export const HERO_VARS = { ...letteringVars(SPECS.tall, ''), ...letteringVars(SPECS.wide, '-md') } as CSSProperties;

/** The rail position for the line below the hero, as CSS custom properties for <main> (a size container). */
export const railVars = () => ({
  '--rail-w-md': cqw(SPECS.wide, SPECS.wide.tram.width),
  '--rail-w-sm': cqw(SPECS.tall, SPECS.tall.tram.width),
  '--rail-x-md': cqw(SPECS.wide, SPECS.wide.tram.points[0][0]),
  '--rail-x-sm': cqw(SPECS.tall, SPECS.tall.tram.points[0][0]),
});
