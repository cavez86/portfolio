import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

// The site mark's cobalt disc. The header mark and the go-to-top control both spin it on hover; the white
// notch makes the turn visible when the disc carries nothing else.
export const Disc = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <span
    className={cn(
      'bg-cobalto relative flex items-center justify-center rounded-full text-white transition-transform duration-700 ease-[cubic-bezier(0.3,1.3,0.5,1)] motion-reduce:transition-none',
      className
    )}
  >
    {children ?? (
      <span className="bg-carta absolute top-[10%] left-1/2 block size-[22%] -translate-x-1/2 rounded-full" />
    )}
  </span>
);
