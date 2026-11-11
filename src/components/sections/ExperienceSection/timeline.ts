/**
 * The experience records on a time axis: each job's start and end in years since January of the first
 * year, the employer it belongs to, and the total time worked.
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
  current: boolean;
  months: number;
  /** Index of the employer in order of first appearance, for its pencil. */
  employer: number;
}

export interface Timeline<T extends TimelineInput> {
  firstYear: number;
  /** Years from January of the first year to today. */
  span: number;
  /** Years worked by today (time between jobs not counted). */
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
  let total = 0;

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
    };
    total += length;
    return segment;
  });

  return { firstYear, segments, span: years(now.getTime()), total };
};

/**
 * Jobs done on another employer's premises, as the role says ("Consultant for Deltatre"): the segment
 * index and the employer it names. A company is named by its first word (as written, at least 4 letters).
 */
export const placements = <T extends TimelineInput & { position: string }>(timeline: Timeline<T>) => {
  const employers = new Map(timeline.segments.map((s) => [s.employer, s.item.company]));
  return timeline.segments.flatMap((segment, index) =>
    [...employers]
      .filter(([employer, company]) => {
        const word = company.split(/\s+/)[0] ?? '';
        return (
          employer !== segment.employer &&
          word.length >= 4 &&
          new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(segment.item.position)
        );
      })
      .map(([employer, company]) => ({ company, employer, index }))
  );
};
