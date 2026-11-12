import type { Segment, Timeline, TimelineInput } from './timeline';

/**
 * Geometry of the experience diagram, drawn as a spacetime diagram: time t runs up the page (today at
 * the top) and each employer has a vertical lane, in the order joined. The career is one world-line
 * that runs up a lane and steps across to the next at each change of employer. Units are the
 * drawing's own (the SVG viewBox).
 */
export interface Variant {
  width: number;
  /** x of the time axis. */
  axisX: number;
  /** Units per year along t. */
  tScale: number;
  /** Free space above the plot (a short last lane's label rises into it) and below it (the lane axis). */
  headroom: number;
  footroom: number;
  lanes: { first: number; last: number; band: number };
  label: {
    gap: number;
    width: number;
    name: number;
    role: number;
    meta: number;
    /**
     * `beside`: each label sits next to its own lane, in the time it covers (wide drawings).
     * `column`: labels stand in one column right of the lanes (narrow drawings).
     */
    placement: 'beside' | 'column';
  };
}

export const WIDE: Variant = {
  axisX: 64,
  footroom: 56,
  headroom: 60,
  label: { gap: 16, meta: 17, name: 30, placement: 'beside', role: 18, width: 330 },
  lanes: { band: 68, first: 140, last: 1104 },
  tScale: 46,
  width: 1200,
};

export const NARROW: Variant = {
  axisX: 40,
  footroom: 48,
  headroom: 40,
  label: { gap: 12, meta: 15, name: 21, placement: 'column', role: 15.5, width: 212 },
  lanes: { band: 14, first: 54, last: 114 },
  tScale: 52,
  width: 340,
};

export const LINE_HEIGHT = { meta: 1.35, name: 1.15, role: 1.3 };
/** Generous average advance of Bricolage Grotesque, so wrapped lines are never underestimated. */
const CHAR_WIDTH = 0.56;
const linesFor = (text: string, size: number, width: number) =>
  Math.max(1, Math.ceil((text.length * CHAR_WIDTH * size) / width));

export interface JobText {
  role: string;
  place: string;
  details: boolean;
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Lane<T extends TimelineInput> {
  employer: number;
  x: number;
  /** The jobs held there, oldest first, with their index in the timeline. */
  jobs: { segment: Segment<T>; index: number; showRole: boolean; showPlace: boolean }[];
  t0: number;
  t1: number;
  label: Box & { align: 'start' | 'end'; anchor: { x: number; y: number } };
}

/** The lines a lane's label needs, top to bottom, matching what the figure renders. */
export const labelLines = <T extends TimelineInput>(
  jobs: Lane<T>['jobs'],
  texts: readonly JobText[],
  variant: Variant
) => {
  const { label } = variant;
  let height = label.name * LINE_HEIGHT.name;
  for (const { index, showRole, showPlace } of jobs) {
    const text = texts[index];
    if (showRole) height += linesFor(text?.role ?? '', label.role, label.width) * label.role * LINE_HEIGHT.role;
    const lines = 1 + (showPlace ? 1 : 0) + (text?.details ? 1 : 0);
    height += lines * label.meta * LINE_HEIGHT.meta;
  }
  return height;
};

export const layoutExperience = <T extends TimelineInput>(
  timeline: Timeline<T>,
  texts: readonly JobText[],
  variant: Variant
) => {
  const { tScale, headroom, footroom, label, width } = variant;
  const plotHeight = timeline.span * tScale;
  const plotTop = headroom;
  const plotBottom = headroom + plotHeight;
  const toY = (t: number) => plotBottom - t * tScale;

  const employers = [...new Set(timeline.segments.map((s) => s.employer))];
  const step = employers.length > 1 ? (variant.lanes.last - variant.lanes.first) / (employers.length - 1) : 0;
  const laneX = (employer: number) => variant.lanes.first + employers.indexOf(employer) * step;
  const half = variant.lanes.band / 2;

  const lanes: Lane<T>[] = employers.map((employer) => {
    const jobs = timeline.segments
      .map((segment, index) => ({ index, segment }))
      .filter(({ segment }) => segment.employer === employer)
      .map(({ index, segment }, k, all) => ({
        index,
        segment,
        // A place is written where the career moved to it, not repeated per employer.
        showPlace: index === 0 || texts[index]?.place !== texts[index - 1]?.place,
        showRole: k === 0 || texts[index]?.role !== texts[all[k - 1].index]?.role,
      }));
    const t0 = jobs[0].segment.t0;
    const t1 = jobs[jobs.length - 1].segment.t1;
    const height = labelLines(jobs, texts, variant);
    const x = laneX(employer);
    const first = employers.indexOf(employer) === 0;
    const bandTop = toY(t1);
    const bandBottom = toY(t0);
    // Centred on its own stretch of time when it fits; otherwise it rises from where the lane starts.
    const y =
      bandBottom - bandTop >= height ? (bandTop + bandBottom - height) / 2 : bandBottom - height - label.gap / 2;
    const box =
      label.placement === 'column'
        ? { x: variant.lanes.last + half + label.gap, y: bandTop }
        : first
          ? { x: x + half + label.gap, y }
          : { x: x - half - label.gap - label.width, y };
    return {
      employer,
      jobs,
      label: {
        ...box,
        align: label.placement === 'beside' && !first ? 'end' : 'start',
        anchor: { x: x + (label.placement === 'column' || first ? half : -half), y: (bandTop + bandBottom) / 2 },
        height,
        width: label.placement === 'column' ? width - box.x : label.width,
      },
      t0,
      t1,
      x,
    };
  });

  // In a column, labels go down from the newest and never overlap; each keeps a leader to its lane.
  if (label.placement === 'column') {
    let floor = Number.NEGATIVE_INFINITY;
    for (const lane of [...lanes].reverse()) {
      lane.label.y = Math.max(lane.label.y, floor);
      lane.label.anchor.y = Math.min(Math.max(lane.label.y + label.name * 0.6, toY(lane.t1)), toY(lane.t0));
      floor = lane.label.y + lane.label.height + label.gap;
    }
  }

  // A label that rises above the plot (a short last lane) gets room above it.
  const overflow = Math.max(0, -Math.min(0, ...lanes.map((lane) => lane.label.y)));
  const bottomOverflow = Math.max(
    0,
    ...lanes.map((lane) => lane.label.y + lane.label.height - (plotBottom + footroom / 2))
  );
  const shift = (y: number) => y + overflow;
  for (const lane of lanes) {
    lane.label.y = shift(lane.label.y);
    lane.label.anchor.y = shift(lane.label.anchor.y);
  }

  const lineX = (s: Segment<T>) => laneX(s.employer);
  const segments = timeline.segments;
  const steps = segments.slice(1).map((s, i) => ({
    from: { x: lineX(segments[i]), y: shift(toY(segments[i].t1)) },
    sameLane: s.employer === segments[i].employer,
    to: { x: lineX(s), y: shift(toY(s.t0)) },
  }));

  return {
    bands: segments.map((s) => ({
      segment: s,
      ...({
        height: (s.t1 - s.t0) * tScale,
        width: variant.lanes.band,
        x: lineX(s) - half,
        y: shift(toY(s.t1)),
      } as Box),
    })),
    height: shift(plotBottom) + footroom + bottomOverflow,
    lanes,
    laneX,
    plotBottom: shift(plotBottom),
    plotTop: shift(plotTop),
    steps,
    toY: (t: number) => shift(toY(t)),
    yearTicks: Array.from({ length: Math.floor(timeline.span) + 1 }, (_, i) => ({
      y: shift(toY(i)),
      year: timeline.firstYear + i,
    })),
  };
};

export const intersects = (a: Box, b: Box) =>
  a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
