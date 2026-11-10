import ContactSection from '@/components/sections/ContactSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HeroSection from '@/components/sections/HeroSection';
import LanguagesSection from '@/components/sections/LanguagesSection';
import SkillsSection from '@/components/sections/SkillsSection';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const Home = () => (
  <main id="main">
    <HeroSection />
    <ExperienceSection />
    <SkillsSection />
    <LanguagesSection />
    <ContactSection />
  </main>
);

export default Home;
