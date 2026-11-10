import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Icon from '@/components/common/Icon';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';

const navLink =
  'type-small rounded-full px-3 py-2 text-base underline decoration-transparent decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-pomodoro';

export const Header = async () => {
  'use cache';
  const t = await getTranslations('Header');
  const contacts = await getLocalizedCollection('contacts');

  return (
    <header className="bg-carta text-inchiostro sticky top-0 z-50 border-b-2 border-inchiostro px-4 py-3 md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Link aria-label={t('home')} className="flex items-center gap-1.5 rounded-full" href="/">
            <span className="bg-cobalto block size-7 rounded-full" />
            <span className="bg-pomodoro block h-3.5 w-7 rounded-full" />
            <span className="bg-girasole border-inchiostro block size-3.5 rounded-full border-2" />
          </Link>
          <nav aria-label={t('navigation')} className="hidden items-center gap-1 md:flex">
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
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {contacts.map((contact) => (
            <a
              aria-label={contact.label}
              className={buttonVariants({ className: 'max-lg:size-10 max-lg:px-0', size: 'sm', variant: 'ghost' })}
              href={contact.url}
              key={contact.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {contact.icon && <Icon className="size-4.5" name={contact.icon} />}
              <span className="hidden lg:block">{contact.label}</span>
            </a>
          ))}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
