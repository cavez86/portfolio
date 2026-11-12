import { describe, expect, it } from 'vitest';

import type { Experience } from '@/payload-types';

import { formatDuration, monthsCovered, toReleases } from './releases';

const job = (company: string, dateFrom: string): Experience =>
  ({ company, id: Date.parse(dateFrom), period: { dateFrom }, position: 'Developer' }) as Experience;

describe('toReleases', () => {
  it('bumps the major version per employer and the minor version within one, newest first', () => {
    const releases = toReleases([
      job('Deltatre Spa', '2019-09-01'),
      job('Prima', '2026-05-01'),
      job('Blue Sof Consulting', '2011-11-15'),
      job('Deltatre Spa', '2025-01-01'),
      job('Teoresi S.p.A.', '2015-01-07'),
    ]);

    expect(releases.map(({ experience, version }) => [version, experience.company])).toEqual([
      ['v4.0', 'Prima'],
      ['v3.1', 'Deltatre Spa'],
      ['v3.0', 'Deltatre Spa'],
      ['v2.0', 'Teoresi S.p.A.'],
      ['v1.0', 'Blue Sof Consulting'],
    ]);
    expect(releases[1].anchor).toBe('v3-1');
  });

  it('starts a new major version when an employer returns after another one', () => {
    const versions = toReleases([job('A', '2010-01-01'), job('B', '2012-01-01'), job('A', '2014-01-01')]).map(
      (release) => release.version
    );

    expect(versions).toEqual(['v3.0', 'v2.0', 'v1.0']);
  });
});

describe('monthsCovered', () => {
  it('counts the first and the last month', () => {
    expect(monthsCovered(new Date('2019-09-01T12:00:00Z'), new Date('2024-12-31T12:00:00Z'))).toBe(64);
    expect(monthsCovered(new Date('2026-05-01T12:00:00Z'), new Date('2026-05-20T12:00:00Z'))).toBe(1);
  });
});

describe('formatDuration', () => {
  it('leaves out empty parts and localises units', () => {
    expect(formatDuration(64, 'en')).toBe('5 years, 4 months');
    expect(formatDuration(24, 'en')).toBe('2 years');
    expect(formatDuration(7, 'it')).toBe('7 mesi');
    expect(formatDuration(13, 'it')).toBe('1 anno e 1 mese');
  });
});
