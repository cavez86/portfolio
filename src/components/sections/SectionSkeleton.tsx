import Section, { gutter } from '@/components/Section';
import { cn } from '@/lib/utils';

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div aria-hidden="true" className={cn('skeleton rounded-sm', className)} />
);

const HeadingSkeleton = () => <SkeletonBlock className="h-12 w-3/4 max-w-72 md:h-16" />;

export const HeroSectionSkeleton = () => (
  <section className="overflow-x-clip pt-6 pb-20 md:pt-10 md:pb-32">
    <div className={gutter}>
      <div className="flex flex-col gap-3 md:gap-5">
        <SkeletonBlock className="h-[4.25rem] w-[88%] md:h-52" />
        <SkeletonBlock className="h-[4.25rem] w-[70%] md:ml-[14vw] md:h-52" />
        <SkeletonBlock className="h-[4.25rem] w-[62%] md:ml-[4vw] md:h-52" />
      </div>
      <div className="mt-8 grid items-end gap-8 md:mt-12 lg:grid-cols-12">
        <SkeletonBlock className="h-9 w-full max-w-xl lg:col-span-8" />
        <SkeletonBlock className="h-12 w-40 lg:col-span-4 lg:justify-self-end" />
      </div>
      <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-11/12" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>
        <div className="order-first flex flex-col gap-4 lg:order-last lg:col-span-7">
          {['hero-fact-1', 'hero-fact-2', 'hero-fact-3', 'hero-fact-4'].map((key) => (
            <SkeletonBlock className="h-10" key={key} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ExperienceSectionSkeleton = () => (
  <Section heading={<HeadingSkeleton />} id="experience">
    <div className="border-border divide-border divide-y border-y">
      {['experience-1', 'experience-2', 'experience-3'].map((key) => (
        <div className="flex flex-col gap-3 py-8" key={key}>
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-8 w-2/3" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </Section>
);

export const SkillsSectionSkeleton = () => (
  <Section heading={<HeadingSkeleton />} id="skills">
    <div className="flex flex-col gap-16">
      {['technical', 'soft'].map((groupKey) => (
        <div className="flex flex-col gap-6" key={groupKey}>
          <SkeletonBlock className="h-9 w-56" />
          <div className="border-border divide-border divide-y border-y">
            {['first', 'second', 'third'].map((rowKey) => (
              <div className="flex flex-col gap-3 py-6" key={rowKey}>
                <SkeletonBlock className="h-4 w-40" />
                <SkeletonBlock className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export const LanguagesSectionSkeleton = () => (
  <Section heading={<HeadingSkeleton />}>
    <div className="border-border divide-border divide-y border-y">
      {['language-1', 'language-2'].map((key) => (
        <div className="flex flex-col gap-3 py-8" key={key}>
          <SkeletonBlock className="h-8 w-1/3" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </Section>
);

export const ContactSectionSkeleton = () => (
  <Section className="bg-notte" heading={<HeadingSkeleton />} id="contact">
    <div className="border-border divide-border divide-y border-y">
      {['contact-1', 'contact-2', 'contact-3'].map((key) => (
        <div className="flex flex-col gap-3 py-8" key={key}>
          <SkeletonBlock className="bg-savoia h-4 w-24" />
          <SkeletonBlock className="bg-savoia h-8 w-2/3" />
        </div>
      ))}
    </div>
  </Section>
);
