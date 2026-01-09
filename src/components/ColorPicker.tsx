'use client';

import { Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useStoredState } from '@/app/hooks/useStoredState';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { hsvaToHslString } from '@uiw/color-convert';
import Hue from '@uiw/react-color-hue';
import { useEffect } from 'react';

const STORAGE_KEY = 'theme-color';
const DEFAULT_HUE = 145; // Terminal green

export function ColorPicker() {
  const t = useTranslations('ColorPicker');
  const [hue, setHue] = useStoredState<number>(STORAGE_KEY, DEFAULT_HUE);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--theme-color',
      hsvaToHslString({
        h: hue,
        s: 100,
        v: 100,
        a: 1,
      })
    );
  }, [hue]);

  const handleHueChange = (newHue: { h: number }) => {
    setHue(newHue.h);
  };

  const handleReset = () => {
    setHue(DEFAULT_HUE);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="relative gap-2">
          <Palette className="h-4 w-4" />
          <div className="h-3 w-3 rounded-full border border-border bg-base" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-75 sm:max-w-100">
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="hue-slider" className="text-sm font-medium">
                {t('hue_label', { hue: Math.round(hue) })}
              </label>
              <Hue hue={hue} onChange={handleHueChange} />
            </div>
            <Button variant="outline" onClick={handleReset} className="w-full">
              {t('reset_button')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
