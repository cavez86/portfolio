import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Icon from '@/components/common/Icon';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';

const navLink =
  'rounded-xs py-2 text-small font-semibold text-foreground underline-offset-8 decoration-2 decoration-primary hover:underline';

export const Header = async () => {
  'use cache';
  const t = await getTranslations('Header');
  const contacts = await getLocalizedCollection('contacts');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <nav aria-label="Main" className="flex items-center gap-5 md:gap-8">
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
        <div className="flex items-center gap-2">
          <div className="hidden items-center md:flex">
            {contacts.map((contact) => (
              <a
                aria-label={contact.label}
                className={buttonVariants({
                  className: 'text-muted-foreground hover:text-foreground',
                  size: 'sm',
                  variant: 'ghost',
                })}
                href={contact.url}
                key={contact.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {contact.icon && <Icon className="size-4" name={contact.icon} />}
                <span className="hidden lg:block">{contact.label}</span>
              </a>
            ))}
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
