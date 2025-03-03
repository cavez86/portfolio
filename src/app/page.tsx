import { ExperienceCard } from '@/components/cards/experience-card';
import { SkillsCard } from '@/components/cards/skills-card';
import { SoftSkillsCard } from '@/components/cards/soft-skills-card';
import { EducationCard } from '@/components/cards/education-card';
import { LanguagesCard } from '@/components/cards/languages-card';
import { AdditionalInfoCard } from '@/components/cards/additional-info-card';
import { personalInfo } from '@/data/content';
import TransitionWrapper from '@/components/common/TransitionWrapper';

const Home = () => (
  <main className="container mx-auto flex max-w-[1264px] flex-col gap-4 px-4 py-4 lg:gap-8 lg:pb-8">
    <div className="flex flex-col items-center gap-3 text-center text-balance lg:gap-6">
      <TransitionWrapper>
        <h1 className="text-primary max-w-5xl text-3xl font-bold md:text-6xl lg:text-8xl">{personalInfo.name}</h1>
      </TransitionWrapper>
      <TransitionWrapper>
        <p className="text-muted-foreground text-xl font-medium md:text-2xl lg:text-3xl">{personalInfo.title}</p>
      </TransitionWrapper>
    </div>
    <TransitionWrapper>
      <p className="text-card-foreground text-center text-balance">{personalInfo.summary}</p>
    </TransitionWrapper>

    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col gap-4 lg:w-2/3 lg:gap-8">
        <TransitionWrapper>
          <ExperienceCard />
        </TransitionWrapper>
        <TransitionWrapper>
          <SkillsCard />
        </TransitionWrapper>
      </div>
      <div className="flex flex-col gap-4 lg:w-1/3 lg:gap-8">
        <TransitionWrapper>
          <SoftSkillsCard />
        </TransitionWrapper>
        <TransitionWrapper>
          <EducationCard />
        </TransitionWrapper>
        <TransitionWrapper>
          <LanguagesCard />
        </TransitionWrapper>
        <TransitionWrapper>
          <AdditionalInfoCard />
        </TransitionWrapper>
      </div>
    </div>
  </main>
);

export default Home;
