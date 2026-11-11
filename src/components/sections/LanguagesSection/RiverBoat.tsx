'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const ROWERS = [-42, -14, 14, 42];

/**
 * A rowing four on the Po (Turin's rowing clubs train under these bridges). It crosses the river as the visitor
 * scrolls past and its oars pull with the scroll. It passes under the bridge decks. Static with reduced motion.
 */
const RiverBoat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ offset: ['start end', 'end start'], target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['-12%', '104%']);
  const stroke = useTransform(scrollYProgress, (p) => Math.sin(p * 70) * 28);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" ref={ref}>
      {/* The current: a few slow streaks on the water. */}
      <svg aria-hidden="true" className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {[22, 48, 81].map((y, i) => (
          <path
            className="stroke-riva/35"
            d={`M${-5 + i * 9},${y} q8,-3 16,0 t16,0 M${50 + i * 7},${y + 6} q6,-2 12,0 t12,0`}
            fill="none"
            key={y}
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <motion.div className="absolute inset-x-0 bottom-[14%]" style={{ x: reduceMotion ? '62%' : x }}>
        <svg aria-hidden="true" className="h-10 w-44" viewBox="-80 -20 160 40">
          <motion.g
            className="stroke-carta"
            strokeLinecap="round"
            strokeWidth="2"
            style={{ skewX: reduceMotion ? 0 : stroke }}
          >
            {ROWERS.map((rx) => (
              <path d={`M${rx},-17V17`} key={rx} />
            ))}
          </motion.g>
          <path className="fill-carta" d="M-78,0 Q-40,-6 0,-6 T78,0 Q40,6 0,6 T-78,0Z" />
          {ROWERS.map((rx) => (
            <circle className="fill-notte" cx={rx} cy="0" key={rx} r="3.2" />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

export default RiverBoat;
