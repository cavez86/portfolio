'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const t = useTranslations('Header');
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      aria-label={t(nextTheme === 'dark' ? 'theme_dark' : 'theme_light')}
      onClick={() => setTheme(nextTheme)}
      size="icon"
      suppressHydrationWarning
      variant="ghost"
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
};
