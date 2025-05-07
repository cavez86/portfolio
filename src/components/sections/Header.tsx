import { LanguageSelector } from '@/components/common/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/content';
import { getTranslation } from '@/lib/i18n/getTranslation';

export const Header = () => {
  const { t } = getTranslation('Header');
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky -top-[66px] z-50 border-b px-6 py-4 backdrop-blur md:top-0">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#experience"
            className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            {t('experience')}
          </a>
          <a
            href="#skills"
            className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            {t('skills')}
          </a>
          <a
            href="#contact"
            className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            {t('contact')}
          </a>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          {personalInfo.contacts.map((contact) => (
            <Button key={contact.type} variant="ghost" size="sm" className="rounded md:text-sm" asChild>
              <a href={contact.url}>
                <contact.icon className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">{contact.label}</span>
              </a>
            </Button>
          ))}
          <LanguageSelector />
          <div className="ml-auto md:ml-2 md:border-l md:pl-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
