import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Atkinson_Hyperlegible_Next, Intel_One_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { ThemeScript } from '@/components/common/ThemeScript';
import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const atkinson = Atkinson_Hyperlegible_Next({
  adjustFontFallback: false,
  subsets: ['latin'],
  variable: '--font-atkinson',
});

// Both faces were drawn for legibility: Atkinson for low-vision readers, Intel One Mono for developers.
const intelOne = Intel_One_Mono({
  adjustFontFallback: false,
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-intel-one',
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    description: t('description'),
    title: t('title'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      className={cn(atkinson.variable, intelOne.variable)}
      data-theme="light"
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <MainProvider>
        <body className="flex min-h-dvh flex-col [&>main]:flex-1">
          <Header />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </MainProvider>
    </html>
  );
}
