import { describe, expect, it } from 'vitest';

import { beadString, pluckProfile, smoothPath, stepBeads } from './beads';

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

describe('pluckProfile', () => {
  it('pushes every mass the same way, hardest where the string was plucked', () => {
    const profile = pluckProfile(6, 1);
    expect(profile.every((share) => share > 0)).toBe(true);
    expect(profile.indexOf(Math.max(...profile))).toBe(1);
  });

  it('is symmetric when plucked in the middle, like the fundamental mode', () => {
    const profile = pluckProfile(5, 2);
    expect(profile[0]).toBeCloseTo(profile[4], 10);
    expect(profile[1]).toBeCloseTo(profile[3], 10);
  });
});

describe('smoothPath', () => {
  it('passes through every point it is given, in order', () => {
    const d = smoothPath([
      [0, 0],
      [10, 5],
      [20, -3],
      [30, 0],
    ]);
    expect(d.startsWith('M0,0')).toBe(true);
    const ends = [...d.matchAll(/ (-?[\d.]+),(-?[\d.]+)(?=C|$)/g)].map((m) => [Number(m[1]), Number(m[2])]);
    expect(ends).toEqual([
      [10, 5],
      [20, -3],
      [30, 0],
    ]);
  });
});
