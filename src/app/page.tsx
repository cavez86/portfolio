import { HeaderCard } from '@/components/cards/header-card';
import { SummaryCard } from '@/components/cards/summary-card';
import { ExperienceCard } from '@/components/cards/experience-card';
import { SkillsCard } from '@/components/cards/skills-card';
import { SoftSkillsCard } from '@/components/cards/soft-skills-card';
import { EducationCard } from '@/components/cards/education-card';
import { LanguagesCard } from '@/components/cards/languages-card';
import { AdditionalInfoCard } from '@/components/cards/additional-info-card';

export default function Home() {
  return (
    <main className="container mx-auto flex max-w-[1264px] flex-col gap-4 px-4 py-4 lg:gap-8 lg:py-8">
      <HeaderCard />
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-4 lg:w-2/3 lg:gap-8">
          <SummaryCard />
          <ExperienceCard />
          <SkillsCard />
        </div>
        <div className="flex flex-col gap-4 lg:w-1/3 lg:gap-8">
          <SoftSkillsCard />
          <EducationCard />
          <LanguagesCard />
          <AdditionalInfoCard />
        </div>
      </div>
    </main>
  );
}
