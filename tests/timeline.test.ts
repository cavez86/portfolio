import { describe, expect, it } from 'vitest';

import { buildAxis, getBar, positionOf } from '../src/components/sections/ExperienceSection/timeline';

const periods = [
  { dateFrom: '2025-02-01T00:00:00.000Z', dateTo: null },
  { dateFrom: '2019-06-01T00:00:00.000Z', dateTo: '2024-12-01T00:00:00.000Z' },
  { dateFrom: '2011-09-01T00:00:00.000Z', dateTo: '2013-05-01T00:00:00.000Z' },
];
const now = new Date('2026-11-10T12:00:00Z');

describe('experience timeline', () => {
  const axis = buildAxis(periods, now);

  it('runs from the first start year to today', () => {
    expect(axis.start).toBe(2011);
    expect(axis.end).toBeGreaterThan(2026.8);
    expect(axis.end).toBeLessThan(2027);
  });

  it('labels the start, every five years and the current year at the right edge', () => {
    expect(axis.ticks.map((t) => t.label)).toEqual([2011, 2015, 2020, 2026]);
    expect(positionOf(axis.ticks.at(-1)?.at ?? 0, axis)).toBe(100);
  });

  it('draws an open job as a bar from its start to the right edge', () => {
    const bar = getBar(periods[0], axis);
    expect(bar.ongoing).toBe(true);
    expect(bar.right).toBe(100);
    expect(bar.left).toBeCloseTo(positionOf(2025 + 1 / 12, axis), 5);
    expect(bar.width).toBeGreaterThan(5);
  });

  it('places a closed job between its first and last month', () => {
    const bar = getBar(periods[1], axis);
    expect(bar.ongoing).toBe(false);
    expect(bar.left).toBeCloseTo(positionOf(2019 + 5 / 12, axis), 5);
    expect(bar.right).toBeCloseTo(positionOf(2025, axis), 5);
  });

  it('lets a short open job start exactly where the closed job before it ends', () => {
    const previous = { dateFrom: '2025-02-01T00:00:00.000Z', dateTo: '2026-04-01T00:00:00.000Z' };
    const current = { dateFrom: '2026-05-01T00:00:00.000Z', dateTo: null };
    const closedBar = getBar(previous, axis);
    const openBar = getBar(current, axis);
    expect(openBar.left).toBeCloseTo(closedBar.right, 5);
    expect(openBar.width).toBeGreaterThan(0);
    expect(openBar.width).toBeLessThan(closedBar.width);
  });
});
