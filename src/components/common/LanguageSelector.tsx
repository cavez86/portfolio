'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'waku';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation('Header');
  const { path, replace } = useRouter();
  const locale = i18n.language;

  const handleChange = (newLocale: string) => {
    replace(path, { locale: newLocale });
  };

  return (
    <Select onValueChange={handleChange} defaultValue={locale}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {i18n.languages.map((loc) => (
          <SelectItem key={loc} value={loc}>
            <span className="text-muted-foreground">{t(`language.${loc}`)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
