'use client';

import { type ReactNode, useEffect, useRef } from 'react';

/** Pointing at a skill lights every stop with that name, so interchanges between lines show up. */
const SkillsNetwork = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const network = ref.current;
    if (!network) return;

    const light = (event: Event) => {
      const name = (event.target as Element).closest<HTMLElement>('[data-skill]')?.dataset.skill;
      for (const stop of network.querySelectorAll<HTMLElement>('[data-skill]')) {
        stop.toggleAttribute('data-lit', stop.dataset.skill === name);
      }
    };
    network.addEventListener('pointerover', light);
    network.addEventListener('pointerleave', light);
    return () => {
      network.removeEventListener('pointerover', light);
      network.removeEventListener('pointerleave', light);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default SkillsNetwork;
