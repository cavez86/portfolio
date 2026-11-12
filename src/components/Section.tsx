import type { ReactNode } from 'react';

import { Permalink } from '@/components/common/Permalink';
import { cn } from '@/lib/utils';

const Section = ({
  id,
  title,
  className,
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}) => (
  <section aria-labelledby={`${id}-title`} className={cn('scroll-mt-24', className)} id={id}>
    <div className="anchored mb-8">
      <h2 className="text-[1.75rem] leading-tight font-bold tracking-[-0.02em] md:text-[2rem]" id={`${id}-title`}>
        {title}
      </h2>
      <Permalink id={id} title={title} />
    </div>
    {children}
  </section>
);

export default Section;
