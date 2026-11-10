import dayjs from 'dayjs';

import type { Experience } from '@/payload-types';

type Period = Pick<Experience['period'], 'dateFrom' | 'dateTo'>;

export interface TimelineTick {
  label: number;
  at: number;
}

export interface TimelineAxis {
  start: number;
  end: number;
  ticks: TimelineTick[];
}

// Fractional year at the start of the month.
const toYear = (date: string | Date) => {
  const d = dayjs(date);
  return d.year() + d.month() / 12;
};

// Shared axis for all jobs: from the first start year to today, so bar length and position are comparable.
// An open-ended job runs to `now`, the right edge.
export const buildAxis = (periods: Period[], now: Date): TimelineAxis => {
  const end = toYear(now) + now.getDate() / 12 / 31;
  const start = Math.floor(Math.min(...periods.map((p) => toYear(p.dateFrom))));
  const ticks = [{ at: start, label: start }];
  for (let year = Math.ceil((start + 1) / 5) * 5; year < end - 2; year += 5) {
    ticks.push({ at: year, label: year });
  }
  ticks.push({ at: end, label: now.getFullYear() });
  return { end, start, ticks };
};

export const positionOf = (year: number, axis: TimelineAxis) => ((year - axis.start) / (axis.end - axis.start)) * 100;

// Bar edges in percent of the axis. A closed job ends with its last month; an open one ends at the axis edge.
export const getBar = (period: Period, axis: TimelineAxis) => {
  const to = period.dateTo ? toYear(period.dateTo) + 1 / 12 : axis.end;
  const left = positionOf(toYear(period.dateFrom), axis);
  const right = positionOf(to, axis);
  return { left, ongoing: !period.dateTo, right, width: right - left };
};
