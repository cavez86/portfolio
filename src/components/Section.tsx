import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Section = ({
  id,
  contentClassName,
  children,
}: {
  id?: string;
  contentClassName?: string;
  children: ReactNode;
}) => (
  <section id={id} className="py-20">
    <div className={cn('container mx-auto px-4', contentClassName || 'max-w-4xl')}>{children}</div>
  </section>
);

export default Section;
