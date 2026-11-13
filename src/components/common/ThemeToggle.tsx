'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

import { DARK_QUERY, THEME_STORAGE_KEY, type Theme } from '@/components/common/theme';

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};

const currentTheme = () => document.documentElement.dataset.theme as Theme | undefined;

const choose = (theme: Theme) => {
  const systemTheme: Theme = matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  try {
    // Picking the system's own scheme goes back to following the system.
    if (theme === systemTheme) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Without storage the choice lasts until the next page load.
  }
  document.documentElement.dataset.theme = theme;
};

export const ThemeToggle = () => {
  const t = useTranslations('Header');
  const theme = useSyncExternalStore(subscribe, currentTheme, () => undefined);

  return (
    <button
      aria-label={t('dark_theme')}
      aria-pressed={theme === undefined ? undefined : theme === 'dark'}
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-highlight hover:text-foreground"
      onClick={() => choose(theme === 'dark' ? 'light' : 'dark')}
      type="button"
    >
      <Moon aria-hidden className="size-5 dark:hidden" />
      <Sun aria-hidden className="hidden size-5 dark:block" />
    </button>
  );
};
