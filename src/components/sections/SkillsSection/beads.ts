/**
 * Masses threaded on a taut string fixed at both ends (coupled oscillators).
 * `y` is each mass's transverse displacement in px, `v` its velocity in px/s.
 * Every mass feels its two neighbours: a = k (y[i-1] - 2 y[i] + y[i+1]) - c v, with walls at y = 0.
 */

export interface BeadString {
  y: number[];
  v: number[];
}

export interface BeadParams {
  /** Coupling k = tension / (mass × spacing), in s⁻². */
  stiffness: number;
  /** Damping, in s⁻¹. */
  damping: number;
  /** Largest displacement drawn, in px. */
  maxY: number;
}

const SUBSTEP = 1 / 240;
const REST_EPSILON = 0.02;

export const beadString = (count: number): BeadString => ({ v: Array(count).fill(0), y: Array(count).fill(0) });

export const stepBeads = (string: BeadString, dt: number, { stiffness, damping, maxY }: BeadParams) => {
  const { y, v } = string;
  const steps = Math.max(1, Math.round(dt / SUBSTEP));
  const h = dt / steps;
  const a = new Array<number>(y.length);

  for (let s = 0; s < steps; s++) {
    for (let i = 0; i < y.length; i++) {
      const left = i === 0 ? 0 : y[i - 1];
      const right = i === y.length - 1 ? 0 : y[i + 1];
      a[i] = stiffness * (left - 2 * y[i] + right) - damping * v[i];
    }
    for (let i = 0; i < y.length; i++) {
      v[i] += a[i] * h;
      y[i] = Math.max(-maxY, Math.min(maxY, y[i] + v[i] * h));
    }
  }

  const resting = y.every((value, i) => Math.abs(value) < REST_EPSILON && Math.abs(v[i]) < REST_EPSILON * 10);
  if (resting) {
    y.fill(0);
    v.fill(0);
  }
  return resting;
};

/**
 * How a pluck at mass `index` shares its impulse along a string of `count` masses: mostly the
 * fundamental mode (zero at both walls, largest in the middle), plus a ripple centred on the mass.
 */
export const pluckProfile = (count: number, index: number) =>
  Array.from(
    { length: count },
    (_, i) => 0.75 * Math.sin((Math.PI * (i + 1)) / (count + 1)) + 0.55 * Math.exp(-((i - index) ** 2) / 1.2)
  );

type Point = readonly [number, number];

/** A smooth SVG path through every point (Catmull–Rom spline written as cubic Béziers). */
export const smoothPath = (points: readonly Point[]) => {
  if (points.length === 0) return '';
  const [first] = points;
  let d = `M${first[0]},${first[1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
};
