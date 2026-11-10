import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Icon from '@/components/common/Icon';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { gutter } from '@/components/Section';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

const navLink =
  'rounded-sm py-2 text-[0.9375rem] font-medium underline decoration-transparent decoration-1 underline-offset-[0.35em] transition-colors hover:decoration-current';

export const Header = async () => {
  'use cache';
  const t = await getTranslations('Header');
  const contacts = await getLocalizedCollection('contacts');

  return (
    <header className="bg-savoia sticky top-0 z-50">
      <div className={cn(gutter, 'flex h-16 items-center justify-between gap-4')}>
        <nav className="flex items-center gap-4 sm:gap-8">
          <Link className={navLink} href="#experience">
            {t('experience')}
          </Link>
          <Link className={navLink} href="#skills">
            {t('skills')}
          </Link>
          <Link className={navLink} href="#contact">
            {t('contact')}
          </Link>
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="mr-2 hidden items-center gap-1 md:flex">
            {contacts.map((contact) => (
              <a
                aria-label={contact.label}
                className={buttonVariants({ size: 'icon', variant: 'ghost' })}
                href={contact.url}
                key={contact.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {contact.icon && <Icon className="size-5" name={contact.icon} />}
              </a>
            ))}
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
