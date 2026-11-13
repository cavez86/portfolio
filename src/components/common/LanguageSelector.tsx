'use client';

import { type Locale, useLocale, useTranslations } from 'next-intl';
import posthog from 'posthog-js';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/** Each language named in itself: English, Italiano. */
const endonym = (locale: Locale) => {
  const name = new Intl.DisplayNames([locale], { type: 'language' }).of(locale) ?? locale;
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
};

export const LanguageSelector = () => {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (newLocale: Locale | null) => {
    if (!newLocale || newLocale === locale) return;
    posthog.capture('language_changed', { locale: newLocale });
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select onValueChange={handleChange} value={locale}>
      <SelectTrigger aria-label={t('language')} className="font-mono">
        <SelectValue>{(value: Locale) => value}</SelectValue>
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false}>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} lang={loc} value={loc}>
            {endonym(loc)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
