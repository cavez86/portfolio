import './globals.css';

import { Geist } from 'next/font/google';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import MainProvider from '@/components/providers';
import { routing } from '@/i18n/routing';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  } else {
    setRequestLocale(routing.defaultLocale);
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
