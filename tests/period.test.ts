import { describe, expect, it } from 'vitest';

import { monthsSpanned, splitMonths, yearMonth, yearsSince } from '../src/components/utils/period';

const at = (iso: string) => new Date(`${iso}T12:00:00.000Z`);

describe('CV periods', () => {
  it('counts the first and the last month of a role', () => {
    expect(monthsSpanned(at('2019-09-01'), at('2024-12-31'))).toBe(64);
    expect(monthsSpanned(at('2026-05-01'), at('2026-05-20'))).toBe(1);
  });

  it('counts years by calendar month, not by day', () => {
    expect(yearsSince(at('2011-11-15'), at('2026-11-01'))).toBe(15);
    expect(yearsSince(at('2011-11-15'), at('2026-10-31'))).toBe(14);
  });

  it('formats dates as year-month in UTC', () => {
    expect(yearMonth(new Date('2015-01-01T00:30:00.000Z'))).toBe('2015-01');
  });

  it('splits months into years and months', () => {
    expect(splitMonths(64)).toEqual({ months: 4, years: 5 });
    expect(splitMonths(7)).toEqual({ months: 7, years: 0 });
  });
});
