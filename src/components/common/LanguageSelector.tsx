'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const supportedLocales = ['en', 'it'];

export const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract current locale from pathname (e.g., /en/about -> en)
  const currentLocale = pathname.split('/')[1];

  const onSelectLocale = (newLocale: string) => {
    // Reconstruct the path without the locale prefix
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
    router.push(`${newPath}${search}`);
  };

  return (
    <Select value={currentLocale} onValueChange={onSelectLocale}>
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>
      <SelectContent>
        {supportedLocales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
