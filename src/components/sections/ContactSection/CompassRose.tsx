'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

const POINTS = [0, 45, 90, 135, 180, 225, 270, 315];

/** The map's compass rose. Its needle turns to point at the visitor's pointer (or last tap). */
const CompassRose = ({ className }: { className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();
  const angle = useMotionValue(0);
  const turn = useSpring(angle, { damping: 14, stiffness: 70 });

  useEffect(() => {
    const point = (event: PointerEvent) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const degrees =
        (Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180) /
          Math.PI +
        90;
      // Take the short way round from the current heading.
      const current = angle.get();
      angle.set(current + ((((degrees - current) % 360) + 540) % 360) - 180);
    };
    window.addEventListener('pointermove', point);
    window.addEventListener('pointerdown', point);
    return () => {
      window.removeEventListener('pointermove', point);
      window.removeEventListener('pointerdown', point);
    };
  }, [angle]);

  return (
    <svg aria-hidden="true" className={className} focusable="false" ref={ref} viewBox="-100 -100 200 200">
      <circle className="fill-none stroke-boundary" r="92" strokeWidth="1.5" />
      <circle className="fill-none stroke-boundary" r="84" strokeDasharray="2 6" strokeWidth="3" />
      {POINTS.map((deg) => (
        <path
          className={deg % 90 === 0 ? 'fill-carta/80' : 'fill-boundary'}
          d={deg % 90 === 0 ? 'M0,-78L9,-9L0,0Z M0,-78L-9,-9L0,0Z' : 'M0,-52L6,-6L0,0Z M0,-52L-6,-6L0,0Z'}
          key={deg}
          transform={`rotate(${deg})`}
        />
      ))}
      <text className="fill-carta font-display text-[22px] font-extrabold" textAnchor="middle" x="0" y="-80">
        N
      </text>
      <motion.g style={{ rotate: reduceMotion ? angle : turn }}>
        <path className="fill-lampione" d="M0,-70L10,0L0,8L-10,0Z" />
        <path className="fill-po stroke-riva" d="M0,70L10,0L0,-8L-10,0Z" strokeWidth="1.5" />
        <circle className="fill-notte stroke-carta" r="6" strokeWidth="2" />
      </motion.g>
    </svg>
  );
};

export default CompassRose;
