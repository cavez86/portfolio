import Section from '@/components/Section';
import { cn } from '@/lib/utils';

// Placeholder blocks take the section's own text colour at low strength, so each field keeps its colour while loading.
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-full bg-current opacity-15 motion-reduce:animate-none', className)} />
);

export const HeroSectionSkeleton = () => (
  <section className="bg-carta text-inchiostro px-5 pt-10 pb-16 md:px-10 md:pt-16 md:pb-24">
    <div className="mx-auto max-w-7xl">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-4">
          <SkeletonBlock className="h-16 w-3/4 md:h-28" />
          <SkeletonBlock className="h-16 w-2/3 md:h-28" />
          <SkeletonBlock className="h-16 w-1/2 md:h-28" />
          <SkeletonBlock className="mt-4 h-7 w-2/3" />
          <SkeletonBlock className="mt-4 h-14 w-48" />
        </div>
        <SkeletonBlock className="mx-auto aspect-square w-full max-w-[34rem]" />
      </div>
      <div className="mt-14 flex max-w-xl flex-col gap-3 border-t-4 border-inchiostro pt-10 md:mt-20">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-11/12" />
        <SkeletonBlock className="h-4 w-4/5" />
      </div>
    </div>
  </section>
);

export const ExperienceSectionSkeleton = () => (
  <Section field="cobalto" id="experience">
    <SkeletonBlock className="h-16 w-3/4 max-w-lg md:h-24" />
    <div className="mt-12 md:mt-16">
      {['experience-1', 'experience-2', 'experience-3', 'experience-4'].map((key) => (
        <div className="flex items-center gap-6 border-t-2 border-current py-6 md:px-4 md:py-7" key={key}>
          <SkeletonBlock className="h-9 w-32 shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-6 w-1/2" />
            <SkeletonBlock className="h-4 w-1/3" />
          </div>
          <SkeletonBlock className="hidden h-4 w-1/3 md:block" />
        </div>
      ))}
    </div>
  </Section>
);

export const SkillsSectionSkeleton = () => (
  <Section field="girasole" id="skills">
    <SkeletonBlock className="h-16 w-3/4 max-w-md md:h-24" />
    <div className="mt-12 md:mt-16">
      {['one', 'two', 'three', 'four', 'five', 'six'].map((rowKey) => (
        <div
          className="grid gap-x-10 gap-y-3 border-t-2 border-inchiostro py-5 md:grid-cols-[15rem_minmax(0,1fr)]"
          key={rowKey}
        >
          <SkeletonBlock className="h-6 w-1/2" />
          <SkeletonBlock className="h-8 w-full max-w-[40ch]" />
        </div>
      ))}
    </div>
  </Section>
);

export const LanguagesSectionSkeleton = () => (
  <Section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center" field="abete">
    <SkeletonBlock className="h-16 w-3/4 max-w-md md:h-24" />
    <div className="flex flex-wrap gap-x-8 gap-y-10 md:gap-x-12">
      {['language-1', 'language-2'].map((key) => (
        <div className="flex flex-col gap-5" key={key}>
          <SkeletonBlock className="size-36 sm:size-44 md:size-64" />
          <SkeletonBlock className="h-8 w-1/2" />
        </div>
      ))}
    </div>
  </Section>
);

export const ContactSectionSkeleton = () => (
  <Section field="pomodoro" id="contact">
    <SkeletonBlock className="h-20 w-3/4 max-w-2xl md:h-32" />
    <SkeletonBlock className="mt-8 h-7 w-2/3 max-w-sm" />
    <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
      {['contact-1', 'contact-2', 'contact-3'].map((key) => (
        <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-6" key={key}>
          <SkeletonBlock className="size-24 shrink-0 md:size-44" />
          <SkeletonBlock className="h-8 w-1/2" />
        </div>
      ))}
    </div>
  </Section>
);
