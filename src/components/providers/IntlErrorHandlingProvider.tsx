'use client';

import { NextIntlClientProvider, useLocale } from 'next-intl';
import type { ReactNode } from 'react';

export default function IntlErrorHandlingProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <NextIntlClientProvider
      getMessageFallback={({ key }) => key}
      locale={locale}
      onError={(error) => {
        if (error.code === 'MISSING_MESSAGE') {
          return;
        }
        console.error(error);
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
