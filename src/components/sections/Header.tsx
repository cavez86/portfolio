import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { ColorPicker } from '@/components/ColorPicker';
import Icon from '@/components/common/Icon';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';

export const Header = async () => {
  'use cache';
  const t = await getTranslations('Header');
  const contacts = await getLocalizedCollection('contacts');

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky -top-16.5 z-50 border-b-2 border-primary/30 px-6 py-4 backdrop-blur md:top-0 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className="font-mono uppercase tracking-wider text-foreground transition-all hover:text-primary hover:shadow-[0_0_8px_var(--color-primary)]"
            href="#experience"
          >
            {t('experience')}
          </Link>
          <Link
            className="font-mono uppercase tracking-wider text-foreground transition-all hover:text-primary hover:shadow-[0_0_8px_var(--color-primary)]"
            href="#skills"
          >
            {t('skills')}
          </Link>
          <Link
            className="font-mono uppercase tracking-wider text-foreground transition-all hover:text-primary hover:shadow-[0_0_8px_var(--color-primary)]"
            href="#contact"
          >
            {t('contact')}
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          {contacts.map((contact) => (
            <a
              className={buttonVariants({ className: 'md:text-sm', size: 'sm', variant: 'ghost' })}
              href={contact.url}
              key={contact.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {contact.icon && <Icon className="h-4 w-4 lg:mr-2" name={contact.icon} />}
              <span className="hidden lg:block">{contact.label}</span>
            </a>
          ))}
          <LanguageSelector />
          <ColorPicker />
        </div>
      </div>
    </header>
  );
};
