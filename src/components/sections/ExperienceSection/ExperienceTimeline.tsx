'use client';

import { type ReactNode, useRef } from 'react';

import ScrollProgress from '@/components/common/ScrollProgress';

/** The tram line: a list of stops plus the tram that follows the scroll. */
const ExperienceTimeline = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative [--rail-x:0.75rem] md:[--rail-x:9.5rem]" ref={ref}>
      <ol>{children}</ol>
      <ScrollProgress targetRef={ref} />
    </div>
  );
};

export default ExperienceTimeline;
