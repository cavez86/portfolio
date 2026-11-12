/**
 * Newton's cradle of letters: every letter of a word is a rigid pendulum of the same mass and length
 * hanging from one beam. Neighbours touch at rest, so a letter moving into its neighbour collides with it.
 * Angles are in radians, positive to the right; time in seconds.
 */

export interface Bob {
  theta: number;
  omega: number;
  /** A grabbed bob follows the pointer and behaves as an immovable wall in collisions. */
  held?: boolean;
}

export interface CradleParams {
  /** ω₀² = g / L, in s⁻². */
  omega0Sq: number;
  /** Linear air damping, in s⁻¹. */
  damping: number;
  /** Coefficient of restitution of a letter-on-letter collision. */
  restitution: number;
  maxTheta: number;
}

export const MAX_THETA = (30 * Math.PI) / 180;
export const SUBSTEP = 1 / 240;
const REST_EPSILON = 1e-3;

export const energy = (chain: readonly Bob[], omega0Sq: number) =>
  chain.reduce((sum, bob) => sum + 0.5 * bob.omega ** 2 + omega0Sq * (1 - Math.cos(bob.theta)), 0);

export const isAtRest = (chains: readonly (readonly Bob[])[]) =>
  chains.every((chain) =>
    chain.every((bob) => !bob.held && Math.abs(bob.theta) < REST_EPSILON && Math.abs(bob.omega) < REST_EPSILON)
  );

const collide = (left: Bob, right: Bob, e: number) => {
  // Contact once the left letter has swung at least as far right as its neighbour (equal lengths).
  if (left.theta < right.theta || left.omega <= right.omega) return;
  if (left.held && right.held) return;

  if (left.held) {
    right.omega = (1 + e) * left.omega - e * right.omega;
    right.theta = left.theta;
  } else if (right.held) {
    left.omega = (1 + e) * right.omega - e * left.omega;
    left.theta = right.theta;
  } else {
    const { omega: a } = left;
    const { omega: b } = right;
    // Equal masses: the 1D collision with restitution e.
    left.omega = ((1 - e) * a + (1 + e) * b) / 2;
    right.omega = ((1 + e) * a + (1 - e) * b) / 2;
    const contact = (left.theta + right.theta) / 2;
    left.theta = contact;
    right.theta = contact;
  }
};

const resolveContacts = (chain: Bob[], e: number) => {
  // A row of touching letters passes the impulse along in one step: sweep both ways a few times.
  for (let sweep = 0; sweep < 3; sweep++) {
    for (let i = 0; i < chain.length - 1; i++) collide(chain[i], chain[i + 1], e);
    for (let i = chain.length - 2; i >= 0; i--) collide(chain[i], chain[i + 1], e);
  }
};

/**
 * Advances one chain by `dt` seconds in fixed sub-steps (semi-implicit Euler).
 * `push[i]` is an extra angular acceleration (s⁻²) applied to bob i during this step.
 */
export const stepChain = (chain: Bob[], dt: number, params: CradleParams, push?: readonly number[]) => {
  const steps = Math.max(1, Math.round(dt / SUBSTEP));
  const h = dt / steps;

  for (let s = 0; s < steps; s++) {
    chain.forEach((bob, i) => {
      if (bob.held) return;
      const alpha = -params.omega0Sq * Math.sin(bob.theta) - params.damping * bob.omega + (push?.[i] ?? 0);
      bob.omega += alpha * h;
      bob.theta += bob.omega * h;
      if (Math.abs(bob.theta) > params.maxTheta) {
        bob.theta = Math.sign(bob.theta) * params.maxTheta;
        bob.omega = 0;
      }
    });
    resolveContacts(chain, params.restitution);
  }

  chain.forEach((bob) => {
    if (!bob.held && Math.abs(bob.theta) < REST_EPSILON && Math.abs(bob.omega) < REST_EPSILON) {
      bob.theta = 0;
      bob.omega = 0;
    }
  });
};

/** Tension in the string divided by m: T/m = g cos θ + L ω² (centripetal term included). */
export const tensionOverMass = (bob: Bob, g: number, lengthMetres: number) =>
  g * Math.cos(bob.theta) + lengthMetres * bob.omega ** 2;
