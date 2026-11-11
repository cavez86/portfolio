'use client';

import { useEffect, useRef } from 'react';

/**
 * A pool of lamplight that follows the visitor's pointer over the map (or the last tap on touch screens).
 * It sits between the map and the lettering, so the text is never washed out.
 */
const MapLantern = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lantern = ref.current;
    const map = lantern?.parentElement;
    if (!lantern || !map) return;

    const move = (event: PointerEvent) => {
      const box = map.getBoundingClientRect();
      lantern.style.setProperty('--lantern-x', `${event.clientX - box.left}px`);
      lantern.style.setProperty('--lantern-y', `${event.clientY - box.top}px`);
      lantern.dataset.lit = '';
    };
    const leave = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') delete lantern.dataset.lit;
    };

    map.addEventListener('pointermove', move);
    map.addEventListener('pointerdown', move);
    map.addEventListener('pointerleave', leave);
    return () => {
      map.removeEventListener('pointermove', move);
      map.removeEventListener('pointerdown', move);
      map.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--lantern-x)_var(--lantern-y),rgb(255_190_100/0.45),rgb(255_150_80/0.14)_8rem,transparent_17rem)] opacity-0 mix-blend-screen transition-opacity duration-300 data-lit:opacity-100"
      ref={ref}
    />
  );
};

export default MapLantern;
