import { describe, expect, it } from 'vitest';

import { intersects, layoutExperience, NARROW, WIDE } from './layout';
import { buildTimeline } from './timeline';

const job = (id: number, company: string, position: string, location: string, dateFrom: string, dateTo?: string) => ({
  company,
  id,
  location,
  period: { dateFrom, dateTo },
  position,
});

const jobs = [
  job(1, 'Blue Sof Consulting', 'Software Developer Apprentice', 'Turin, Italy', '2011-11-15', '2014-12-31'),
  job(
    2,
    'Teoresi S.p.A.',
    'Full Stack Web Developer (Consultant for Deltatre)',
    'Turin, Italy',
    '2015-01-07',
    '2019-08-31'
  ),
  job(3, 'Deltatre Spa', 'Tech Lead / Full Stack Web Developer', 'Turin, Italy', '2019-09-01', '2024-12-31'),
  job(4, 'Deltatre Spa', 'Tech Lead / Full Stack Web Developer', 'Turin, Italy', '2025-01-01', '2026-04-30'),
  job(5, 'Prima', 'Software Engineer', 'Milan, Italy', '2026-05-01'),
];

const timeline = buildTimeline(jobs, new Date('2026-11-11T00:00:00Z'));
const texts = timeline.segments.map((s) => ({
  details: s.item.id !== 5,
  place: s.item.location,
  role: s.item.position,
}));

describe.each([
  ['wide', WIDE],
  ['narrow', NARROW],
])('layoutExperience (%s)', (_, variant) => {
  const layout = layoutExperience(timeline, texts, variant);
  const labels = layout.lanes.map((lane) => lane.label);

  it('gives each employer one lane, the returning employer included', () => {
    expect(layout.lanes.map((lane) => lane.jobs.map((j) => j.segment.item.id))).toEqual([[1], [2], [3, 4], [5]]);
    expect(layout.lanes[2].jobs.map((j) => j.showRole)).toEqual([true, false]);
  });

  it('writes a place only where the career moved to it', () => {
    expect(layout.lanes.map((lane) => lane.jobs.map((j) => j.showPlace))).toEqual([
      [true],
      [false],
      [false, false],
      [true],
    ]);
  });

  it('never lets two labels overlap', () => {
    for (let i = 0; i < labels.length; i++)
      for (let j = i + 1; j < labels.length; j++) expect(intersects(labels[i], labels[j])).toBe(false);
  });

  it('keeps every label off the world-line: lanes in use and the steps between them', () => {
    for (const label of labels) {
      for (const band of layout.bands) expect(intersects(label, band)).toBe(false);
      for (const step of layout.steps) {
        const box = {
          height: Math.abs(step.to.y - step.from.y) + 4,
          width: Math.abs(step.to.x - step.from.x),
          x: Math.min(step.from.x, step.to.x),
          y: Math.min(step.from.y, step.to.y) - 2,
        };
        expect(intersects(label, box)).toBe(false);
      }
      expect(label.x).toBeGreaterThanOrEqual(variant.axisX);
      expect(label.x + label.width).toBeLessThanOrEqual(variant.width);
      expect(label.y).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('layoutExperience on wide drawings', () => {
  const variant = WIDE;
  const layout = layoutExperience(timeline, texts, variant);

  it('sets each label beside its own lane, within the time that lane covers', () => {
    for (const lane of layout.lanes) {
      const nearEdge = Math.min(Math.abs(lane.label.x - lane.x), Math.abs(lane.label.x + lane.label.width - lane.x));
      expect(nearEdge).toBeLessThanOrEqual(variant.lanes.band / 2 + variant.label.gap + 1);
      expect(lane.label.y + lane.label.height).toBeGreaterThan(layout.toY(lane.t1));
      expect(lane.label.y).toBeLessThan(layout.toY(lane.t0));
    }
  });
});
