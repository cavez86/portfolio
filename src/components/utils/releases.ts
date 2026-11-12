import type { Experience } from '@/payload-types';

export interface Release {
  /** Anchor id used for permalinks, e.g. "v3-1". */
  anchor: string;
  experience: Experience;
  /** Semantic-style version label, e.g. "v3.1". */
  version: string;
}

const sameEmployer = (a: Experience, b: Experience) =>
  a.company.trim().toLowerCase() === b.company.trim().toLowerCase();

/**
 * Versions the career like software: the major number goes up with each new employer,
 * the minor number with each further entry at the same employer. Returns newest first.
 */
export const toReleases = (experience: Experience[]): Release[] => {
  const chronological = [...experience].sort((a, b) => Date.parse(a.period.dateFrom) - Date.parse(b.period.dateFrom));
  let major = 0;
  let minor = 0;

  return chronological
    .map((entry, index) => {
      const previous = chronological[index - 1];
      if (previous && sameEmployer(previous, entry)) {
        minor += 1;
      } else {
        major += 1;
        minor = 0;
      }
      return { anchor: `v${major}-${minor}`, experience: entry, version: `v${major}.${minor}` };
    })
    .reverse();
};

/** Calendar months covered from one date to another, counting both the first and the last month. */
export const monthsCovered = (from: Date, to: Date) =>
  (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + to.getUTCMonth() - from.getUTCMonth() + 1;

export const formatMonth = (date: Date, locale: string, month: 'short' | 'long' = 'short') =>
  new Intl.DateTimeFormat(locale, { month, timeZone: 'UTC', year: 'numeric' }).format(date);

/** "5 years, 4 months" / "5 anni e 4 mesi"; zero parts are left out. */
export const formatDuration = (months: number, locale: string) => {
  const unit = (value: number, name: 'year' | 'month') =>
    new Intl.NumberFormat(locale, { style: 'unit', unit: name, unitDisplay: 'long' }).format(value);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [years > 0 && unit(years, 'year'), (rest > 0 || years === 0) && unit(rest, 'month')].filter(
    (part): part is string => !!part
  );
  return new Intl.ListFormat(locale, { style: 'long', type: 'unit' }).format(parts);
};
