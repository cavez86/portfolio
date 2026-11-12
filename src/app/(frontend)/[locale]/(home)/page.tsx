import { Suspense } from 'react';

import AboutSection from '@/components/sections/AboutSection';
import BackgroundSection from '@/components/sections/BackgroundSection';
import ContactSection from '@/components/sections/ContactSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import { Toc } from '@/components/sections/Toc';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const Home = () => (
  <main>
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <div className="lg:grid lg:grid-cols-[minmax(0,46rem)_13rem] lg:justify-between lg:gap-16">
        <div className="space-y-20 md:space-y-28">
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <BackgroundSection />
        </div>
        <aside className="hidden lg:block">
          <Suspense>
            <Toc />
          </Suspense>
        </aside>
      </div>
    </div>
    <div className="band mt-24 md:mt-32">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <ContactSection />
      </div>
    </div>
  </main>
);

export default Home;
