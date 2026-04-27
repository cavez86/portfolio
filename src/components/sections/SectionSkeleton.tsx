import Section from '@/components/Section';
import { cn } from '@/lib/utils';

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn('bg-primary/10 animate-pulse rounded-sm border border-primary/20', className)} />
);

export const HeroSectionSkeleton = () => (
  <section className="px-4 py-8 md:py-16">
    <div className="container mx-auto">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <SkeletonBlock className="h-14 w-3/4 max-w-2xl md:h-20" />
        <SkeletonBlock className="h-8 w-2/3 max-w-xl" />
        <div className="flex w-full max-w-2xl flex-col gap-3">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-11/12" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>
        <SkeletonBlock className="h-11 w-40" />
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 md:mt-16 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-card border-2 border-primary/20 p-4 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            <SkeletonBlock className="mx-auto mb-3 h-8 w-8" />
            <SkeletonBlock className="mx-auto mb-2 h-4 w-3/4" />
            <SkeletonBlock className="mx-auto h-5 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ExperienceSectionSkeleton = () => (
  <Section id="experience">
    <div className="space-y-6 md:space-y-12">
      <SkeletonBlock className="mx-auto h-10 w-56" />
      <div className="flex flex-col gap-6 md:gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-card border border-border p-6 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            <SkeletonBlock className="mb-4 h-6 w-2/3" />
            <SkeletonBlock className="mb-3 h-4 w-1/3" />
            <SkeletonBlock className="mb-2 h-4 w-full" />
            <SkeletonBlock className="mb-2 h-4 w-11/12" />
            <SkeletonBlock className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export const SkillsSectionSkeleton = () => (
  <Section id="skills" contentClassName="max-w-5xl flex flex-col gap-6 md:gap-12">
    <div className="space-y-4 text-center">
      <SkeletonBlock className="mx-auto h-10 w-52" />
      <SkeletonBlock className="mx-auto h-5 w-full max-w-2xl" />
    </div>

    {Array.from({ length: 2 }).map((_, groupIndex) => (
      <div key={groupIndex} className="flex flex-col gap-4 md:gap-8">
        <SkeletonBlock className="mx-auto h-8 w-44" />
        <div className="flex flex-col gap-6 md:flex-row">
          {Array.from({ length: 2 }).map((_, cardIndex) => (
            <div
              key={cardIndex}
              className="bg-card min-w-75 flex-1 border border-border p-6 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
            >
              <SkeletonBlock className="mb-4 h-6 w-1/2" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, itemIndex) => (
                  <SkeletonBlock key={itemIndex} className="h-4 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </Section>
);

export const LanguagesSectionSkeleton = () => (
  <Section contentClassName="max-w-3xl">
    <div className="space-y-6 md:space-y-12">
      <div className="space-y-4 text-center">
        <SkeletonBlock className="mx-auto h-10 w-56" />
        <SkeletonBlock className="mx-auto h-5 w-full max-w-2xl" />
      </div>

      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-card border border-border p-6 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-4">
              <SkeletonBlock className="h-12 w-12 shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <SkeletonBlock className="h-5 w-1/3" />
                  <SkeletonBlock className="h-4 w-20" />
                </div>
                <SkeletonBlock className="h-2.5 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export const ContactSectionSkeleton = () => (
  <Section id="contact" contentClassName="max-w-3xl">
    <div className="space-y-6">
      <SkeletonBlock className="mx-auto h-10 w-52" />
      <div className="bg-card border border-border p-6 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <SkeletonBlock className="mb-6 h-6 w-1/2" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <SkeletonBlock className="h-10 w-10 shrink-0" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-1/3" />
                <SkeletonBlock className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);
