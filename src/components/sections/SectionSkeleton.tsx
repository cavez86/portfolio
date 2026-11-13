import type { ReactNode } from 'react';

import Section from '@/components/Section';

const Bar = ({ width }: { width: string }) => <div className="h-4 rounded-sm bg-highlight" style={{ width }} />;

const rows = ['92%', '78%', '85%', '64%', '88%', '72%', '95%', '60%'];

/** Placeholder while a section's CMS data streams in: the real heading over still bars, nothing animated. */
export const SectionSkeleton = ({
  id,
  lines = 4,
  title,
}: {
  id: Parameters<typeof Section>[0]['id'];
  lines?: number;
  title: ReactNode;
}) => (
  <Section id={id} title={title}>
    <div aria-hidden className="flex flex-col gap-4 pt-2">
      {rows.slice(0, lines).map((width) => (
        <Bar key={width} width={width} />
      ))}
    </div>
  </Section>
);

export const HeroSectionSkeleton = () => (
  <div
    aria-hidden
    className="page-frame grid gap-x-12 gap-y-10 pt-10 pb-14 md:pt-16 md:pb-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
  >
    <div className="flex flex-col gap-5">
      <div className="h-12 w-4/5 rounded-sm bg-highlight md:h-16" />
      <div className="h-12 w-3/5 rounded-sm bg-highlight md:h-16" />
      <Bar width="90%" />
      <Bar width="70%" />
    </div>
    <div className="h-80 rounded-lg border border-border bg-panel" />
  </div>
);
