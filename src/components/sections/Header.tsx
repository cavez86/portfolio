import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { LanguageSelector } from '@/components/common/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

import Icon, { IconName } from '../common/Icon';
import { getLocalizedCollection } from '../utils/db';

export const Header = async () => {
  const t = await getTranslations('Header');
  const contacts = await getLocalizedCollection('contacts');

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky -top-[66px] z-50 border-b-2 border-primary/30 px-6 py-4 backdrop-blur md:top-0 dark:shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#experience"
            className="font-mono uppercase tracking-wider text-foreground transition-all hover:text-primary dark:hover:shadow-[0_0_8px_var(--color-primary)]"
          >
            {t('experience')}
          </Link>
          <Link
            href="#skills"
            className="font-mono uppercase tracking-wider text-foreground transition-all hover:text-primary dark:hover:shadow-[0_0_8px_var(--color-primary)]"
          >
            {t('skills')}
          </Link>
          <Link
            href="#contact"
            className="font-mono uppercase tracking-wider text-foreground transition-all hover:text-primary dark:hover:shadow-[0_0_8px_var(--color-primary)]"
          >
            {t('contact')}
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          {contacts.map((contact) => (
            <Button key={contact.url} variant="ghost" size="sm" className="md:text-sm" asChild>
              <a href={contact.url}>
                <Icon name={contact.icon as IconName} className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">{contact.label}</span>
              </a>
            </Button>
          ))}
          <LanguageSelector />
          <div className="ml-auto md:ml-2 md:border-l-2 md:border-primary/30 md:pl-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
