import { describe, expect, it } from 'vitest';

import { layoutExperience, NARROW, WIDE } from './layout';
import { buildTimeline } from './timeline';

const job = (id: number, company: string, position: string, dateFrom: string, dateTo?: string) => ({
  company,
  id,
  period: { dateFrom, dateTo },
  position,
});

const jobs = [
  job(1, 'Blue Sof Consulting', 'Software Developer Apprentice', '2011-11-15', '2014-12-31'),
  job(2, 'Teoresi S.p.A.', 'Full Stack Web Developer (Consultant for Deltatre)', '2015-01-07', '2019-08-31'),
  job(3, 'Deltatre Spa', 'Tech Lead / Full Stack Web Developer', '2019-09-01', '2024-12-31'),
  job(4, 'Deltatre Spa', 'Tech Lead / Full Stack Web Developer', '2025-01-01', '2026-04-30'),
  job(5, 'Prima', 'Software Engineer', '2026-05-01'),
];

describe.each([
  ['wide', WIDE],
  ['narrow', NARROW],
])('layoutExperience (%s)', (_, variant) => {
  const timeline = buildTimeline(jobs, new Date('2026-11-11T00:00:00Z'));
  const layout = layoutExperience(
    timeline,
    timeline.segments.map((s) => ({ details: s.item.id !== 5, role: s.item.position })),
    variant
  );

  it('never lets two labels overlap', () => {
    const sorted = [...layout.labels].sort((a, b) => a.top - b.top);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].top).toBeGreaterThanOrEqual(sorted[i - 1].top + sorted[i - 1].height);
    }
  });

  it('keeps every label on the empty side of the world-line, inside the drawing', () => {
    for (const label of layout.labels) {
      expect(label.top).toBeGreaterThanOrEqual(0);
      expect(label.x + label.width).toBeLessThanOrEqual(variant.width);
      for (const [x, y] of layout.line) {
        if (y >= label.top && y <= label.top + label.height) expect(x).toBeLessThan(label.x);
      }
    }
  });

  it('draws the world-line upwards and to the right only', () => {
    for (let i = 1; i < layout.line.length; i++) {
      expect(layout.line[i][0]).toBeGreaterThanOrEqual(layout.line[i - 1][0]);
      expect(layout.line[i][1]).toBeLessThanOrEqual(layout.line[i - 1][1]);
    }
  });
});
