import { describe, expect, it } from 'vitest';

import { buildTimeline } from './timeline';

const job = (id: number, company: string, dateFrom: string, dateTo?: string) => ({
  company,
  id,
  period: { dateFrom, dateTo },
});

const jobs = [
  job(5, 'Prima', '2026-05-01', undefined),
  job(1, 'Blue Sof', '2011-11-15', '2014-12-31'),
  job(4, 'Deltatre', '2025-01-01', '2026-04-30'),
  job(3, 'Deltatre', '2019-09-01', '2024-12-31'),
  job(2, 'Teoresi', '2015-01-07', '2019-08-31'),
];

describe('buildTimeline', () => {
  const now = new Date('2026-11-11T00:00:00Z');
  const timeline = buildTimeline(jobs, now);

  it('starts the time axis in January of the first job and ends it today', () => {
    expect(timeline.firstYear).toBe(2011);
    expect(timeline.span).toBeCloseTo(15.86, 2);
  });

  it('orders jobs in time and counts only the time worked', () => {
    const { segments } = timeline;
    expect(segments.map((s) => s.item.id)).toEqual([1, 2, 3, 4, 5]);
    for (let i = 1; i < segments.length; i++) expect(segments[i].t0).toBeGreaterThan(segments[i - 1].t1);
    expect(timeline.total).toBeCloseTo(
      segments.reduce((sum, s) => sum + (s.t1 - s.t0), 0),
      10
    );
    expect(timeline.total).toBeLessThan(timeline.span);
  });

  it('runs the current job to today and gives a returning employer the same pencil', () => {
    const last = timeline.segments.at(-1);
    expect(last).toMatchObject({ current: true, months: 6 });
    expect(last?.t1).toBeCloseTo(timeline.span, 10);
    expect(timeline.segments.map((s) => s.employer)).toEqual([0, 1, 2, 2, 3]);
  });

  it('moves the end of the axis with the date', () => {
    expect(buildTimeline(jobs, new Date('2030-06-01T00:00:00Z')).span).toBeGreaterThan(timeline.span);
  });
});
