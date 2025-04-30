import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

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
  <section id={id} className={cn('px-4', className)}>
    <div className={cn('container mx-auto', contentClassName || 'max-w-4xl')}>{children}</div>
  </section>
);

export default Section;
