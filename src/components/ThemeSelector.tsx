'use client';

import { Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ThemeVariant, useTheme } from './providers/ThemeProvider';

const THEME_OPTIONS: Array<{ value: ThemeVariant; label: string; description: string }> = [
  {
    value: 'terminal',
    label: 'Terminal',
    description: 'Cyberpunk/hacker aesthetic with neon accents',
  },
  {
    value: 'brutalist',
    label: 'Brutalist',
    description: 'Bold minimalism with stark contrasts',
  },
  {
    value: 'glassmorphic',
    label: 'Glassmorphic',
    description: 'Depth-rich design with frosted glass overlays',
  },
  {
    value: 'editorial',
    label: 'Editorial',
    description: 'Magazine-style layout with serif typography',
  },
  {
    value: 'kinetic',
    label: 'Kinetic',
    description: 'Motion-first with animated typography',
  },
  {
    value: 'accessible',
    label: 'Accessible',
    description: 'WCAG AAA compliant with high contrast',
  },
];

export function ThemeSelector() {
  const t = useTranslations('ThemeSelector');
  const { theme, setTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="relative gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">{t('button')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-75 sm:max-w-100">
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-4">
            <label htmlFor="theme-selector" className="text-sm font-medium">
              {t('select_theme')}
            </label>
            <Select value={theme} onValueChange={(value) => setTheme(value as ThemeVariant)}>
              <SelectTrigger id="theme-selector">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {THEME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border border-border bg-muted p-4 text-sm">
            <p className="font-medium">
              {t('current_theme')}: {THEME_OPTIONS.find((o) => o.value === theme)?.label}
            </p>
            <p className="mt-2 text-muted-foreground">{THEME_OPTIONS.find((o) => o.value === theme)?.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
