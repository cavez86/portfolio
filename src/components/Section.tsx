import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const Section = ({
  id,
  className,
  contentClassName,
  children,
}: {
  id?: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) => (
  <section id={id} className={cn('px-4 py-8 border-b border-border', className)}>
    <div className={cn('container mx-auto', contentClassName || 'max-w-4xl')}>{children}</div>
  </section>
);

export default Section;
