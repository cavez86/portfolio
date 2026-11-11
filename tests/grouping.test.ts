import { describe, expect, it } from 'vitest';

import { groupByEmployer } from '../src/components/sections/ExperienceSection/grouping';

const job = (id: number, company: string) => ({ company, id });

describe('groupByEmployer', () => {
  it('groups consecutive jobs at the same employer wherever they sit in the list', () => {
    const jobs = [job(1, 'Prima'), job(2, 'Deltatre'), job(3, 'Deltatre'), job(4, 'Teoresi'), job(5, 'Blue Sof')];
    expect(groupByEmployer(jobs).map((group) => group.map((j) => j.id))).toEqual([[1], [2, 3], [4], [5]]);
  });

  it('keeps jobs at the same employer apart when another employer sits between them', () => {
    const jobs = [job(1, 'Deltatre'), job(2, 'Teoresi'), job(3, 'Deltatre')];
    expect(groupByEmployer(jobs)).toHaveLength(3);
  });
});
