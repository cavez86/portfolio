'use client';

import { type Locale, useLocale, useTranslations } from 'next-intl';
import posthog from 'posthog-js';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

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
    <Select
      items={routing.locales.map((loc) => ({ label: loc.toUpperCase(), value: loc }))}
      onValueChange={handleChange}
      value={locale}
    >
      <SelectTrigger aria-label={t('language_label')} className="ml-1">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false}>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {t(`language.${loc}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
