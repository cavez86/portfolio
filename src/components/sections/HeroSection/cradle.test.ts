import { describe, expect, it } from 'vitest';

import { type Bob, type CradleParams, energy, isAtRest, MAX_THETA, stepChain } from './cradle';

const params: CradleParams = { damping: 0, maxTheta: MAX_THETA, omega0Sq: 36, restitution: 1 };
const chainOf = (n: number): Bob[] => Array.from({ length: n }, () => ({ omega: 0, theta: 0 }));

const run = (chain: Bob[], seconds: number, p = params, onStep?: () => void) => {
  for (let t = 0; t < seconds; t += 1 / 60) {
    stepChain(chain, 1 / 60, p);
    onStep?.();
  }
};

describe('stepChain', () => {
  it('passes the swing of the first letter through the row to the last one, like a cradle', () => {
    const chain = chainOf(5);
    chain[0].theta = -0.4;
    let lastMax = 0;
    let middleMax = 0;
    run(chain, 0.6, params, () => {
      lastMax = Math.max(lastMax, chain[4].theta);
      middleMax = Math.max(middleMax, Math.abs(chain[2].theta));
    });

    expect(lastMax).toBeGreaterThan(0.35);
    expect(middleMax).toBeLessThan(0.05);
  });

  it('never creates energy, and loses it with damping and inelastic collisions', () => {
    const chain = chainOf(6);
    chain[0].theta = -0.6;
    const start = energy(chain, params.omega0Sq);
    let previous = start;
    run(chain, 3, { ...params, damping: 0.3, restitution: 0.9 }, () => {
      const now = energy(chain, params.omega0Sq);
      expect(now).toBeLessThanOrEqual(previous + 1e-9);
      previous = now;
    });

    expect(previous).toBeLessThan(start * 0.5);
  });

  it('lets a disturbed row settle back to rest with every letter upright', () => {
    const chain = chainOf(4);
    chain[1].omega = 3;
    run(chain, 20, { ...params, damping: 0.6, restitution: 0.9 });

    expect(isAtRest([chain])).toBe(true);
    expect(chain.every((bob) => bob.theta === 0)).toBe(true);
  });

  it('keeps a held letter where the pointer put it and knocks its neighbour away', () => {
    const chain = chainOf(2);
    chain[0] = { held: true, omega: 4, theta: 0.2 };
    stepChain(chain, 1 / 60, params);

    expect(chain[0].theta).toBe(0.2);
    expect(chain[1].omega).toBeGreaterThan(4);
  });

  it('never swings a letter past the angle limit', () => {
    const chain = chainOf(1);
    chain[0].omega = 40;
    run(chain, 0.5);

    expect(Math.abs(chain[0].theta)).toBeLessThanOrEqual(MAX_THETA);
  });
});
