/**
 * The experience records as a world-line: calendar time t against years of experience accumulated τ.
 * τ grows at 1 yr/yr while employed and stays flat between jobs, so the line only ever rises and no
 * job title is ranked against another.
 */

export interface TimelineInput {
  id: number;
  company: string;
  period: { dateFrom: string; dateTo?: string | null };
}

export interface Segment<T extends TimelineInput> {
  item: T;
  /** Start and end, in years since January of the first year. */
  t0: number;
  t1: number;
  /** Experience accumulated at the start and end, in years. */
  tau0: number;
  tau1: number;
  current: boolean;
  months: number;
  /** Index of the employer in order of first appearance, for its pencil. */
  employer: number;
}

export interface Timeline<T extends TimelineInput> {
  firstYear: number;
  /** Years from January of the first year to today. */
  span: number;
  /** Experience accumulated by today, in years. */
  total: number;
  /** Oldest first. */
  segments: Segment<T>[];
}

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export const buildTimeline = <T extends TimelineInput>(items: readonly T[], now: Date): Timeline<T> => {
  const chronological = [...items].sort((a, b) => Date.parse(a.period.dateFrom) - Date.parse(b.period.dateFrom));
  if (chronological.length === 0) return { firstYear: now.getUTCFullYear(), segments: [], span: 0, total: 0 };

  const firstYear = new Date(chronological[0].period.dateFrom).getUTCFullYear();
  const origin = Date.UTC(firstYear, 0, 1);
  const years = (time: number) => (time - origin) / YEAR_MS;
  const employers: string[] = [];
  let tau = 0;

  const segments = chronological.map((item) => {
    const from = Date.parse(item.period.dateFrom);
    const to = item.period.dateTo ? Math.min(Date.parse(item.period.dateTo), now.getTime()) : now.getTime();
    const length = Math.max(0, (to - from) / YEAR_MS);
    if (!employers.includes(item.company)) employers.push(item.company);
    const segment = {
      current: !item.period.dateTo,
      employer: employers.indexOf(item.company),
      item,
      months: Math.max(1, Math.round(length * 12)),
      t0: years(from),
      t1: years(to),
      tau0: tau,
      tau1: tau + length,
    };
    tau += length;
    return segment;
  });

  return { firstYear, segments, span: years(now.getTime()), total: tau };
};

export interface Box {
  /** Wanted top edge and height, in the drawing's units (y grows downwards). */
  top: number;
  height: number;
}

/**
 * Moves labels apart vertically. `boxes` are ordered from the bottom of the drawing to the top; each
 * label keeps its wanted position unless it would overlap the one below it, in which case it moves up.
 * Returns the new top edges.
 */
export const stackUpwards = (boxes: readonly Box[], gap: number) => {
  const tops: number[] = [];
  boxes.forEach((box, i) => {
    tops.push(i === 0 ? box.top : Math.min(box.top, tops[i - 1] - gap - box.height));
  });
  return tops;
};
