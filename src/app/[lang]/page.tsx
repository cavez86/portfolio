import HeroSection from '@/components/sections/HeroSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import LanguagesSection from '@/components/sections/LanguagesSection';
import ContactSection from '@/components/sections/ContactSection';
import { Language, locales } from '@/i18n/settings';

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const language = locales.includes(lang) ? (lang.toUpperCase() as Language) : ('EN' as Language);

  return (
    <main className="relative flex flex-col gap-10 py-4 md:gap-16 md:py-16 lg:gap-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900" />
      <HeroSection lang={language} />
      <ExperienceSection lang={language} />
      <SkillsSection />
      <LanguagesSection />
      <ContactSection />
    </main>
  );
};

export default Home;
