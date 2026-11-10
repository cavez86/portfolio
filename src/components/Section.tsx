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
  compact = false,
  children,
}: {
  id?: string;
  field: Field;
  className?: string;
  compact?: boolean;
  children: ReactNode;
}) => (
  <section className={cn(fieldClasses[field], 'px-5 md:px-10', compact ? 'py-12 md:py-16' : 'py-16 md:py-28')} id={id}>
    <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>
  </section>
);

export default Section;
