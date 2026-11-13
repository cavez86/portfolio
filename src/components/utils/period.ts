// Calendar maths for CV periods. CMS dates are ISO timestamps at noon UTC, so UTC getters give the intended day.

const monthIndex = (date: Date) => date.getUTCFullYear() * 12 + date.getUTCMonth();

/** Whole calendar months from `from` to `to`, counting both the first and the last month. */
export const monthsSpanned = (from: Date, to: Date) => monthIndex(to) - monthIndex(from) + 1;

/** Years elapsed since `from`, by calendar month: Nov 2011 to Nov 2026 is 15. */
export const yearsSince = (from: Date, now: Date) => Math.floor((monthIndex(now) - monthIndex(from)) / 12);

/** `2019-09`: the period notation shown on the page. */
export const yearMonth = (date: Date) => `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;

export const splitMonths = (months: number) => ({ months: months % 12, years: Math.floor(months / 12) });
