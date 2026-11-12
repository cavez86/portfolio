import { cn } from '@/lib/utils';

/** A figure not drawn yet: pencil outlines where the ink will go. */
const Sketch = ({ className }: { className?: string }) => (
  <div aria-hidden="true" className={cn('rounded-sm border-2 border-dashed border-pencil/50', className)} />
);

const FigureSkeleton = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <section className="sheet py-12 md:py-16" id={id}>
    <Sketch className="h-10 w-64 max-w-full md:h-12" />
    <Sketch className="mt-4 h-4 w-full max-w-xl" />
    {children}
  </section>
);

export const HeroSectionSkeleton = () => (
  <section className="sheet pt-8 pb-6 md:pt-14 md:pb-10">
    <div className="flex flex-col gap-6">
      {['w-[85%] md:w-[62%]', 'w-[80%] md:w-[90%]'].map((width) => (
        <div
          className={cn('border-t-[3px] border-pencil/50 pt-[0.8em] text-[3.4rem] md:text-[8.4rem]', width)}
          key={width}
        >
          <Sketch className="h-[0.9em] w-full" />
        </div>
      ))}
    </div>
    <Sketch className="mt-8 h-8 w-full max-w-2xl" />
  </section>
);

export const ExperienceSectionSkeleton = () => (
  <FigureSkeleton id="experience">
    <Sketch className="mt-12 h-[22rem] w-full" />
  </FigureSkeleton>
);

export const SkillsSectionSkeleton = () => (
  <FigureSkeleton id="skills">
    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-1">
      {['one', 'two', 'three', 'four', 'five', 'six'].map((key) => (
        <Sketch className="h-48 xl:h-16" key={key} />
      ))}
    </div>
  </FigureSkeleton>
);

export const LanguagesSectionSkeleton = () => (
  <FigureSkeleton id="languages">
    <div className="mt-12 grid gap-6">
      {['first', 'second'].map((key) => (
        <Sketch className="h-28" key={key} />
      ))}
    </div>
  </FigureSkeleton>
);

export const ContactSectionSkeleton = () => (
  <FigureSkeleton id="contact">
    <Sketch className="mt-12 h-72 max-w-4xl" />
  </FigureSkeleton>
);
