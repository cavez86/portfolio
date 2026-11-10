import Section from '@/components/Section';
import { cn } from '@/lib/utils';

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn('rounded-xs bg-muted motion-safe:animate-pulse', className)} />
);

const HeadingSkeleton = () => (
  <div className="space-y-4">
    <SkeletonBlock className="h-10 w-64 max-w-full" />
    <SkeletonBlock className="h-5 w-full max-w-md" />
  </div>
);

export const HeroSectionSkeleton = () => (
  <section>
    <div className="flex min-h-[calc(100svh-3.5rem)] items-end md:min-h-[min(46rem,calc(100svh-3.5rem))] md:items-center">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-16">
        <div className="max-w-3xl space-y-5 border-2 border-border p-6 md:p-12">
          <SkeletonBlock className="h-14 w-4/5 md:h-24" />
          <SkeletonBlock className="h-6 w-2/3" />
          <SkeletonBlock className="h-12 w-44" />
        </div>
      </div>
    </div>
    <div className="mx-auto w-full max-w-6xl space-y-3 px-5 py-16 md:px-8 md:py-24">
      {['hero-1', 'hero-2', 'hero-3', 'hero-4'].map((key) => (
        <SkeletonBlock className="h-4 w-full max-w-xl" key={key} />
      ))}
    </div>
  </section>
);

export const ExperienceSectionSkeleton = () => (
  <Section heading={<HeadingSkeleton />} id="experience">
    <div className="space-y-10">
      {['experience-1', 'experience-2', 'experience-3'].map((key) => (
        <div className="flex gap-5" key={key}>
          <SkeletonBlock className="h-14 w-1 shrink-0" />
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-6 w-1/2" />
            <SkeletonBlock className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export const SkillsSectionSkeleton = () => (
  <Section heading={<HeadingSkeleton />} id="skills">
    <div className="space-y-5">
      {['first', 'second', 'third', 'fourth'].map((key) => (
        <div className="space-y-2" key={key}>
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-6 w-4/5" />
        </div>
      ))}
    </div>
  </Section>
);

export const LanguagesSectionSkeleton = () => (
  <Section heading={<HeadingSkeleton />} id="languages">
    <div className="space-y-6">
      {['language-1', 'language-2'].map((key) => (
        <div className="flex items-center justify-between gap-6" key={key}>
          <div className="w-1/2 space-y-2">
            <SkeletonBlock className="h-6 w-2/3" />
            <SkeletonBlock className="h-4 w-full" />
          </div>
          <SkeletonBlock className="h-3 w-28" />
        </div>
      ))}
    </div>
  </Section>
);

export const ContactSectionSkeleton = () => (
  <Section className="bg-card" heading={<HeadingSkeleton />} id="contact">
    <div className="space-y-6">
      {['contact-1', 'contact-2', 'contact-3'].map((key) => (
        <div className="flex items-center gap-5" key={key}>
          <SkeletonBlock className="size-7 shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-1/4" />
            <SkeletonBlock className="h-6 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  </Section>
);
