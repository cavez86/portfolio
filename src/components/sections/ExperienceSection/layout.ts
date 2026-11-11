import { stackUpwards, type Timeline, type TimelineInput } from './timeline';

/**
 * Geometry of the experience diagram in drawing units. Time t runs up the page (today at the top),
 * experience τ runs to the right. The area between the t-axis and the world-line is the hatched side;
 * labels sit on the empty side, right of the line, next to their own segment.
 */
export interface Variant {
  width: number;
  /** x of the t-axis. */
  axisX: number;
  /** Units per year along τ and along t. */
  tauScale: number;
  tScale: number;
  /** Free space above the plot for labels lifted off crowded segments, and below it for the τ-axis. */
  headroom: number;
  footroom: number;
  label: {
    gap: number;
    maxWidth: number;
    name: number;
    role: number;
    meta: number;
    /** Lines the date and place need: one on wide drawings, two on narrow ones. */
    metaLines: number;
  };
}

export const WIDE: Variant = {
  axisX: 72,
  footroom: 72,
  headroom: 96,
  label: { gap: 18, maxWidth: 440, meta: 17, metaLines: 1, name: 30, role: 18 },
  tauScale: 40,
  tScale: 40,
  width: 1200,
};

export const NARROW: Variant = {
  axisX: 40,
  footroom: 64,
  headroom: 150,
  label: { gap: 12, maxWidth: 240, meta: 15, metaLines: 2, name: 21, role: 15.5 },
  tauScale: 6.4,
  tScale: 50,
  width: 340,
};

export const LINE_HEIGHT = { meta: 1.35, name: 1.15, role: 1.3 };
/** Generous average advance of Bricolage Grotesque, so wrapped lines are never underestimated. */
const CHAR_WIDTH = 0.56;

const linesFor = (text: string, size: number, width: number) =>
  Math.max(1, Math.ceil((text.length * CHAR_WIDTH * size) / width));

export interface LabelBox {
  x: number;
  top: number;
  width: number;
  height: number;
  /** Where the label's leader meets the world-line. */
  anchor: { x: number; y: number };
}

export const layoutExperience = <T extends TimelineInput>(
  timeline: Timeline<T>,
  /** Per segment: its role, and whether it has details to open (one more line). */
  texts: readonly { role: string; details: boolean }[],
  variant: Variant
) => {
  const { axisX, tauScale, tScale, headroom, footroom, label, width } = variant;
  const plotHeight = timeline.span * tScale;
  const toY = (t: number) => headroom + plotHeight - t * tScale;
  const toX = (tau: number) => axisX + tau * tauScale;
  const { segments } = timeline;

  /** Experience accumulated at time t (flat between jobs). */
  const tauAt = (t: number) => {
    let tau = 0;
    for (const s of segments) {
      if (t >= s.t1) tau = s.tau1;
      else if (t > s.t0) return s.tau0 + (t - s.t0);
    }
    return tau;
  };

  // Wrapped lines are counted at the narrowest a label can get, so heights are never underestimated.
  const narrowest = Math.min(label.maxWidth, width - toX(timeline.total) - label.gap);
  const sized = segments.map((segment, i) => {
    const anchorT = (segment.t0 + segment.t1) / 2;
    const labelWidth = Math.min(label.maxWidth, width - toX(segment.tau1) - label.gap);
    const height =
      label.name * LINE_HEIGHT.name +
      linesFor(texts[i]?.role ?? '', label.role, narrowest) * label.role * LINE_HEIGHT.role +
      (label.metaLines + (texts[i]?.details ? 1 : 0)) * label.meta * LINE_HEIGHT.meta;
    return { anchorT, height, labelWidth, segment };
  });

  const tops = stackUpwards(
    sized.map(({ anchorT, height }) => ({ height, top: toY(anchorT) - height / 2 })),
    label.gap * 0.6
  );

  const labels: LabelBox[] = sized.map(({ anchorT, height, labelWidth, segment }, i) => {
    // Clear of the line at the label's highest point, where the line is furthest right.
    const tTop = (headroom + plotHeight - tops[i]) / tScale;
    const x = Math.max(toX(segment.tau1), toX(tauAt(Math.min(tTop, timeline.span)))) + label.gap;
    return {
      anchor: { x: toX(segment.tau0 + (anchorT - segment.t0)), y: toY(anchorT) },
      height,
      top: tops[i],
      width: Math.min(labelWidth, width - x),
      x,
    };
  });

  // Lifted labels may need more room above the plot than planned.
  const overflow = Math.max(0, -Math.min(0, ...labels.map((l) => l.top)));
  const shift = (y: number) => y + overflow;

  return {
    bands: segments.map((s) => ({
      points: [
        [axisX, toY(s.t0)],
        [toX(s.tau0), toY(s.t0)],
        [toX(s.tau1), toY(s.t1)],
        [axisX, toY(s.t1)],
      ].map(([x, y]) => [x, shift(y)] as const),
      segment: s,
    })),
    height: shift(headroom + plotHeight + footroom),
    labels: labels.map((l) => ({ ...l, anchor: { ...l.anchor, y: shift(l.anchor.y) }, top: shift(l.top) })),
    line: segments.flatMap((s) => [[toX(s.tau0), shift(toY(s.t0))] as const, [toX(s.tau1), shift(toY(s.t1))] as const]),
    plotBottom: shift(headroom + plotHeight),
    tauTicks: Array.from({ length: Math.floor((timeline.total + 1) / 5) + 1 }, (_, i) => ({
      tau: i * 5,
      x: toX(i * 5),
    })),
    toX,
    toY: (t: number) => shift(toY(t)),
    yearTicks: Array.from({ length: Math.floor(timeline.span) + 1 }, (_, i) => ({
      y: shift(toY(i)),
      year: timeline.firstYear + i,
    })),
  };
};
