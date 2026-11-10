import dayjs from 'dayjs';

import type { Experience } from '@/payload-types';

export interface TimelineAxis {
  start: number;
  end: number;
  ticks: number[];
}

const toYear = (date: string) => {
  const d = dayjs(date);
  return d.year() + d.month() / 12;
};

// Shared year axis for all jobs, so bar length and position are comparable across rows.
export const buildAxis = (experience: Experience[]): TimelineAxis => {
  const froms = experience.map((exp) => toYear(exp.period.dateFrom));
  const latest = Math.max(
    ...experience.map((exp) => (exp.period.dateTo ? toYear(exp.period.dateTo) : toYear(exp.period.dateFrom)))
  );
  const start = Math.floor(Math.min(...froms));
  const end = Math.floor(latest) + 1;
  const ticks = [start];
  for (let year = Math.ceil((start + 1) / 5) * 5; year < end; year += 5) {
    ticks.push(year);
  }
  return { end, start, ticks };
};

export const getBar = (exp: Experience, axis: TimelineAxis) => {
  const span = axis.end - axis.start;
  const from = toYear(exp.period.dateFrom);
  const to = exp.period.dateTo ? toYear(exp.period.dateTo) + 1 / 12 : axis.end;
  return {
    left: ((from - axis.start) / span) * 100,
    ongoing: !exp.period.dateTo,
    width: Math.max(((to - from) / span) * 100, 2),
  };
};

export const positionOf = (year: number, axis: TimelineAxis) => ((year - axis.start) / (axis.end - axis.start)) * 100;
