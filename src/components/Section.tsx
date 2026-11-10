import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** A district of the map: the heading sits in a left column, the content beside it. */
const Section = ({
  id,
  className,
  heading,
  children,
}: {
  id?: string;
  className?: string;
  heading: ReactNode;
  children: ReactNode;
}) => (
  <section className={cn('border-t border-border py-16 md:py-24', className)} id={id}>
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-20">
      <div className="lg:sticky lg:top-24 lg:self-start">{heading}</div>
      <div>{children}</div>
    </div>
  </section>
);

export const SectionHeading = ({ title, description }: { title: string; description?: string }) => (
  <>
    <h2 className="text-district font-bold text-balance text-foreground">{title}</h2>
    {description && <p className="mt-3 text-lead text-pretty text-muted-foreground">{description}</p>}
  </>
);

export default Section;
