/** Turns the experience records into a position–time plot: t from January of the first year to today. */

export interface TimelineInput {
  id: number;
  position: string;
  period: { dateFrom: string; dateTo?: string | null };
}

export interface Segment<T extends TimelineInput> {
  item: T;
  /** Start and end as fractions of the time axis. */
  from: number;
  to: number;
  /** Index into `positions`, oldest position first. */
  level: number;
  current: boolean;
  months: number;
}

export interface Timeline<T extends TimelineInput> {
  /** Distinct positions held, in the order they were first held. */
  positions: string[];
  /** Newest first, as the CV reads. */
  segments: Segment<T>[];
  /** Calendar years on the axis with their fraction, first year to the current one. */
  ticks: { year: number; at: number }[];
}

const MONTH_MS = (365.25 / 12) * 24 * 60 * 60 * 1000;

export const buildTimeline = <T extends TimelineInput>(items: readonly T[], now: Date): Timeline<T> => {
  const chronological = [...items].sort((a, b) => Date.parse(a.period.dateFrom) - Date.parse(b.period.dateFrom));
  if (chronological.length === 0) return { positions: [], segments: [], ticks: [] };

  const firstYear = new Date(chronological[0].period.dateFrom).getUTCFullYear();
  const start = Date.UTC(firstYear, 0, 1);
  const end = now.getTime();
  const at = (time: number) => (time - start) / (end - start);

  const positions = [...new Set(chronological.map((item) => item.position))];
  const segments = chronological
    .map((item) => {
      const from = Date.parse(item.period.dateFrom);
      const to = item.period.dateTo ? Date.parse(item.period.dateTo) : end;
      return {
        current: !item.period.dateTo,
        from: at(from),
        item,
        level: positions.indexOf(item.position),
        months: Math.max(1, Math.round((to - from) / MONTH_MS)),
        to: at(to),
      };
    })
    .reverse();

  const ticks = Array.from({ length: now.getUTCFullYear() - firstYear + 1 }, (_, i) => ({
    at: at(Date.UTC(firstYear + i, 0, 1)),
    year: firstYear + i,
  }));

  return { positions, segments, ticks };
};
