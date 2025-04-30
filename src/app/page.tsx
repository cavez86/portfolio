import HeroSection from '@/components/sections/HeroSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import LanguagesSection from '@/components/sections/LanguagesSection';
import ContactSection from '@/components/sections/ContactSection';

const Home = () => (
  <main className="relative">
    {/* Background gradient */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900" />
    <HeroSection />
    <ExperienceSection />
    <SkillsSection />
    <LanguagesSection />
    <ContactSection />
  </main>
);

export default Home;
