'use client';

import Hue from '@uiw/react-color-hue';
import { Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useStoredState } from '@/app/hooks/useStoredState';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const STORAGE_KEY = 'theme-color';
const DEFAULT_HUE = 145; // Terminal green

export function ColorPicker() {
  const t = useTranslations('ColorPicker');
  const [hue, setHue] = useStoredState<number>(STORAGE_KEY, DEFAULT_HUE);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', `hsl(${hue}, 100%, 50%)`);
  }, [hue]);

  const handleHueChange = (newHue: { h: number }) => {
    setHue(newHue.h);
  };

  const handleReset = () => {
    setHue(DEFAULT_HUE);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button className="relative gap-2" size="sm" variant="outline" />}>
        <Palette className="h-4 w-4" />
        <div aria-hidden="true" className="h-3 w-3 rounded-full border border-border bg-base" />
      </DialogTrigger>
      <DialogContent className="max-w-75 sm:max-w-100">
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="hue-slider">
                {t('hue_label', { hue: Math.round(hue) })}
              </label>
              <Hue hue={hue} onChange={handleHueChange} />
            </div>
            <Button className="w-full" onClick={handleReset} variant="outline">
              {t('reset_button')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
