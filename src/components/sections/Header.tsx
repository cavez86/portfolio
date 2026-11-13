import { getTranslations } from 'next-intl/server';

import { LanguageSelector } from '@/components/common/LanguageSelector';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { getLocalizedGlobal } from '@/components/utils/db';
import { Link } from '@/i18n/navigation';

const sections = ['experience', 'skills', 'contact'] as const;

export const Header = async () => {
  'use cache';
  const [t, personalInfo] = await Promise.all([getTranslations('Header'), getLocalizedGlobal('personal-info')]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <a
        className="sr-only rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-4"
        href="#main"
      >
        {t('skip_to_content')}
      </a>
      <div className="page-frame flex h-16 items-center justify-between gap-4">
        <Link className="truncate text-[0.9375rem] font-bold hover:text-primary sm:text-lg" href="/">
          {personalInfo.name}
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label={t('sections')} className="mr-2 hidden items-center gap-1 md:flex">
            {sections.map((section) => (
              <Link
                className="ref-mark rounded-md px-3 py-2 text-base text-muted-foreground hover:text-foreground"
                data-ref={section}
                href={`/#${section}`}
                key={section}
              >
                {t(section)}
              </Link>
            ))}
          </nav>
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
