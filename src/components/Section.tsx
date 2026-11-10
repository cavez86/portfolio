import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Shared page gutter and measure; every section and the header hang off the same left edge. */
export const gutter = 'mx-auto w-full max-w-360 px-5 md:px-10';

/**
 * A section laid out like a specimen page: a ruled heading row (title left, an optional line right)
 * and the typeset content below it across the full measure. Sections space themselves from the top only,
 * so the gap between two sections is one step of the scale, not two paddings added together.
 */
const Section = ({
  id,
  heading,
  intro,
  className,
  children,
}: {
  id?: string;
  heading: ReactNode;
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}) => (
  <section className={cn('pt-14 md:pt-20', className)} id={id}>
    <div className={gutter}>
      <div className="border-border grid gap-4 border-t pt-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[1] font-medium tracking-tight text-balance wrap-break-word [--opsz:16] lg:col-span-8">
          {heading}
        </h2>
        {intro && <div className="max-w-[40ch] pb-1 text-lg text-pretty lg:col-span-4">{intro}</div>}
      </div>
      <div className="mt-8 md:mt-10">{children}</div>
    </div>
  </section>
);

export default Section;
