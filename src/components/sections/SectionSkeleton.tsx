import { HERO_VARS } from '@/components/sections/HeroSection/cityMap';
import { cn } from '@/lib/utils';

/** Placeholders keep each district's ground and the line's position, so the page does not jump when data arrives. */
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn('rounded-xs bg-carta/10 motion-safe:animate-pulse', className)} />
);

const DistrictSkeleton = ({ className, id, rows }: { className: string; id: string; rows: string[] }) => (
  <section className={cn('relative', className)} id={id}>
    <div className="mx-auto w-full max-w-6xl space-y-6 px-5 py-20 md:px-8 md:py-24">
      <SkeletonBlock className="h-14 w-72 max-w-full md:h-20" />
      {rows.map((key) => (
        <SkeletonBlock className="h-6 w-full max-w-xl" key={key} />
      ))}
    </div>
  </section>
);

export const HeroSectionSkeleton = () => (
  <section>
    <div
      className="aspect-(--map-ratio) w-full md:aspect-(--map-ratio-md) md:max-h-[calc(100svh-3.5rem)]"
      style={HERO_VARS}
    />
    <div className="line-row pt-14 pb-16 md:pt-20 md:pb-20">
      <span aria-hidden="true" className="rail rail-planned inset-y-0" />
      <div className="col-start-2 space-y-3 pr-5 md:col-start-3">
        {['hero-1', 'hero-2', 'hero-3', 'hero-4'].map((key) => (
          <SkeletonBlock className="h-4 w-full max-w-xl" key={key} />
        ))}
      </div>
    </div>
  </section>
);

export const ExperienceSectionSkeleton = () => (
  <section id="experience">
    {['experience-1', 'experience-2', 'experience-3'].map((key) => (
      <div className="line-row pb-16" key={key}>
        <span aria-hidden="true" className="rail rail-planned inset-y-0" />
        <div className="col-start-2 space-y-3 pr-5 md:col-start-3">
          <SkeletonBlock className="h-9 w-1/2" />
          <SkeletonBlock className="h-5 w-1/3" />
        </div>
      </div>
    ))}
  </section>
);

export const SkillsSectionSkeleton = () => (
  <DistrictSkeleton className="bg-isolato" id="skills" rows={['skills-1', 'skills-2', 'skills-3', 'skills-4']} />
);

export const LanguagesSectionSkeleton = () => (
  <DistrictSkeleton className="bg-po" id="languages" rows={['language-1', 'language-2']} />
);

export const ContactSectionSkeleton = () => (
  <DistrictSkeleton className="bg-piazza" id="contact" rows={['contact-1', 'contact-2', 'contact-3']} />
);
