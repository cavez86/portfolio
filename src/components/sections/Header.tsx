import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

import Icon, { IconName } from '../common/Icon';
import { getLocalizedCollection } from '../utils/db';

export const Header = async () => {
  const t = await getTranslations('Header');
  const contacts = await getLocalizedCollection('contacts');

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky -top-[66px] z-50 border-b px-6 py-4 backdrop-blur md:top-0">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#experience"
            className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            {t('experience')}
          </Link>
          <Link
            href="#skills"
            className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            {t('skills')}
          </Link>
          <Link
            href="#contact"
            className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            {t('contact')}
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          {contacts.map((contact) => (
            <Button key={contact.url} variant="ghost" size="sm" className="rounded md:text-sm" asChild>
              <a href={contact.url}>
                <Icon name={contact.icon as IconName} className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">{contact.label}</span>
              </a>
            </Button>
          ))}
          <ExportPDFButton />
          <LanguageSelector />
          <div className="ml-auto md:ml-2 md:border-l md:pl-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
