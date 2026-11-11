import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** One figure of the notebook: its number sits in the margin, its title opens the section. */
const Section = ({
  id,
  figure,
  title,
  className,
  children,
}: {
  id?: string;
  figure: string;
  title: ReactNode;
  className?: string;
  children: ReactNode;
}) => (
  <section aria-labelledby={id && `${id}-title`} className={cn('sheet py-12 md:py-16', className)} id={id}>
    <p className="margin-note mb-1 md:mb-0 md:pt-3">{figure}</p>
    <h2 className="text-[2rem] leading-tight md:text-title" id={id && `${id}-title`}>
      {title}
    </h2>
    {children}
  </section>
);

export default Section;
