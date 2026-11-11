import { describe, expect, it } from 'vitest';

import { buildTimeline } from './timeline';

const job = (id: number, position: string, dateFrom: string, dateTo?: string) => ({
  id,
  period: { dateFrom, dateTo },
  position,
});

const jobs = [
  job(4, 'Lead', '2025-01-01', undefined),
  job(1, 'Apprentice', '2011-11-15', '2014-12-31'),
  job(3, 'Lead', '2019-09-01', '2024-12-31'),
  job(2, 'Developer', '2015-01-07', '2019-08-31'),
];

describe('buildTimeline', () => {
  const now = new Date('2026-11-11T00:00:00Z');
  const timeline = buildTimeline(jobs, now);

  it('runs the axis from January of the first year to today, one tick per year', () => {
    expect(timeline.ticks[0]).toEqual({ at: 0, year: 2011 });
    expect(timeline.ticks.at(-1)?.year).toBe(2026);
    expect(timeline.ticks).toHaveLength(16);
  });

  it('extends the current job to today and lists jobs newest first', () => {
    expect(timeline.segments.map((s) => s.item.id)).toEqual([4, 3, 2, 1]);
    expect(timeline.segments[0]).toMatchObject({ current: true, months: 22, to: 1 });
    expect(timeline.segments[1].current).toBe(false);
  });

  it('puts repeated positions on one level, ordered by when they were first held', () => {
    expect(timeline.positions).toEqual(['Apprentice', 'Developer', 'Lead']);
    expect(timeline.segments.map((s) => s.level)).toEqual([2, 2, 1, 0]);
  });

  it('moves the end of the axis with the date', () => {
    const later = buildTimeline(jobs, new Date('2030-06-01T00:00:00Z'));
    expect(later.ticks.at(-1)?.year).toBe(2030);
    expect(later.segments[1].to).toBeLessThan(timeline.segments[1].to);
  });
});
