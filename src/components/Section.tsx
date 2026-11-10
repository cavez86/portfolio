import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Shared page gutter and measure; every section and the header hang off the same left edge. */
export const gutter = 'mx-auto w-full max-w-360 px-5 md:px-10';

/**
 * A section laid out like a specimen page: a ruled heading row (title left, one line of intro right)
 * and the typeset content below it across the full measure.
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
  <section className={cn('py-16 md:py-28', className)} id={id}>
    <div className={gutter}>
      <div className="border-border grid gap-4 border-t pt-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[1] font-medium tracking-tight text-balance wrap-break-word lg:col-span-8">
          {heading}
        </h2>
        {intro && <p className="text-foschia max-w-[40ch] pb-1 text-lg text-pretty lg:col-span-4">{intro}</p>}
      </div>
      <div className="mt-10 md:mt-14">{children}</div>
    </div>
  </section>
);

export default Section;
