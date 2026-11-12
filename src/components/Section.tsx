import type { ReactNode } from 'react';

import type { SectionId } from '@/components/sections/HeroSection/snippet';
import { cn } from '@/lib/utils';

// Documentation layout borrowed from man pages: the heading hangs in the left margin, the text reads in one column.
const Section = ({
  children,
  className,
  id,
  title,
}: {
  children: ReactNode;
  className?: string;
  id: SectionId | 'contact';
  title: ReactNode;
}) => (
  <section aria-labelledby={`${id}-title`} className="page-frame" id={id}>
    <div
      className={cn(
        'grid gap-x-12 gap-y-6 border-t border-border py-14 md:py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]',
        className
      )}
    >
      <h2
        className="ref-mark self-start justify-self-start text-2xl leading-tight font-bold"
        data-ref={id}
        id={`${id}-title`}
      >
        {title}
      </h2>
      <div className="min-w-0 max-w-[42rem]">{children}</div>
    </div>
  </section>
);

export default Section;
