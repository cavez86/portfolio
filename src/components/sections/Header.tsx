import { getTranslations } from 'next-intl/server';

import { LanguageSelector } from '@/components/common/LanguageSelector';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { getLocalizedGlobal } from '@/components/utils/db';
import { Link } from '@/i18n/navigation';

const navLinkClass =
  'rounded-sm px-1 text-[0.9375rem] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline';

export const Header = async () => {
  'use cache';
  const [t, personalInfo] = await Promise.all([getTranslations('Header'), getLocalizedGlobal('personal-info')]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="truncate rounded-sm text-[0.9375rem] font-semibold tracking-[-0.01em]" href="/">
          {personalInfo.name}
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="mr-3 hidden items-center gap-5 md:flex">
            <Link className={navLinkClass} href="/#releases">
              {t('experience')}
            </Link>
            <Link className={navLinkClass} href="/#skills">
              {t('skills')}
            </Link>
            <Link className={navLinkClass} href="/#contact">
              {t('contact')}
            </Link>
          </nav>
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
