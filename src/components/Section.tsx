import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type Field = 'cobalto' | 'girasole' | 'abete' | 'pomodoro' | 'carta' | 'inchiostro';

// Each section owns one flat colour. --focus keeps the keyboard outline visible on that colour.
export const fieldClasses: Record<Field, string> = {
  abete: 'bg-abete text-white [--focus:#ffffff]',
  carta: 'bg-carta text-inchiostro [--focus:var(--color-inchiostro)]',
  cobalto: 'bg-cobalto text-white [--focus:#ffffff]',
  girasole: 'bg-girasole text-inchiostro [--focus:var(--color-inchiostro)]',
  inchiostro: 'bg-inchiostro text-carta [--focus:var(--color-girasole)]',
  pomodoro: 'bg-pomodoro text-inchiostro [--focus:var(--color-inchiostro)]',
};

const Section = ({
  id,
  field,
  className,
  edge,
  children,
}: {
  id?: string;
  field: Field;
  className?: string;
  // A drawn piece on the field's top edge. Its box starts at the edge and the piece pulls its upper part
  // into the field above; the content follows below the box, so the piece never covers it.
  edge?: ReactNode;
  children: ReactNode;
}) => (
  <section className={cn(fieldClasses[field], 'relative px-5 py-16 md:px-10 md:py-28')} id={id}>
    {edge && <div className="mx-auto -mt-16 mb-6 flow-root max-w-7xl md:-mt-28">{edge}</div>}
    <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>
  </section>
);

export default Section;
