import { describe, expect, it } from 'vitest';

import { beadString, stepBeads } from './beads';

const params = { damping: 1.2, maxY: 30, stiffness: 400 };

describe('stepBeads', () => {
  it('carries a pluck from one mass to the next along the string', () => {
    const string = beadString(4);
    string.v[0] = 300;
    let reached = 0;
    for (let i = 0; i < 20; i++) {
      stepBeads(string, 1 / 60, params);
      reached = Math.max(reached, Math.abs(string.y[3]));
    }

    expect(reached).toBeGreaterThan(1);
  });

  it('settles back to a straight string', () => {
    const string = beadString(3);
    string.v[1] = 500;
    let resting = false;
    for (let i = 0; i < 60 * 15 && !resting; i++) resting = stepBeads(string, 1 / 60, params);

    expect(resting).toBe(true);
    expect(string.y).toEqual([0, 0, 0]);
  });

  it('never draws a mass further than the largest displacement', () => {
    const string = beadString(1);
    string.v[0] = 50_000;
    stepBeads(string, 1 / 60, params);

    expect(Math.abs(string.y[0])).toBeLessThanOrEqual(params.maxY);
  });
});
