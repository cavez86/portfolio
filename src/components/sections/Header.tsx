import { getTranslations } from 'next-intl/server';

import Icon from '@/components/common/Icon';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { getLocalizedCollection } from '@/components/utils/db';

const links = ['experience', 'skills', 'contact'] as const;

export const Header = async () => {
  'use cache';
  const t = await getTranslations('Header');
  const contacts = await getLocalizedCollection('contacts');

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 supports-backdrop-filter:bg-paper/85 supports-backdrop-filter:backdrop-blur-sm">
      <div className="sheet flex h-14 items-center justify-between gap-3 md:h-16">
        <nav
          aria-label={t('navigation')}
          className="flex items-center gap-3 text-[0.9rem] font-medium min-[400px]:gap-4 min-[400px]:text-[0.95rem] sm:gap-7 md:text-base"
        >
          {links.map((link) => (
            <a
              className="highlight py-1 text-graphite hover:highlight-on focus-visible:highlight-on"
              href={`#${link}`}
              key={link}
            >
              {t(link)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 md:gap-2">
          {contacts.map((contact) => (
            <a
              aria-label={contact.label}
              className="hidden size-10 items-center justify-center rounded-sm text-ink transition-colors hover:bg-highlighter sm:inline-flex"
              href={contact.url}
              key={contact.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {contact.icon && <Icon aria-hidden="true" className="size-5" name={contact.icon} />}
            </a>
          ))}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
