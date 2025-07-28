'use client';

import { Locale, useLocale, useTranslations } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export const LanguageSelector = () => {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select onValueChange={handleChange} value={locale}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            <span className="text-muted-foreground">{t(`language.${loc}`)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
