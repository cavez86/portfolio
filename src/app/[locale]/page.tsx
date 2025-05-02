import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import LanguagesSection from '@/components/sections/LanguagesSection';
import ContactSection from '@/components/sections/ContactSection';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const Home = () => (
  <main className="relative flex flex-col gap-10 py-4 md:gap-16 md:py-16 lg:gap-20">
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
