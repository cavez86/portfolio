import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { hasLocale, Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist } from 'next/font/google';
import { locale } from 'next/root-params';
import { ReactNode } from 'react';

import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { routing } from '@/i18n/routing';
import { Toaster } from 'sonner';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = (await locale()) as Locale;
  const t = await getTranslations({ locale: currentLocale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  const currentLocale = await locale();

  if (hasLocale(routing.locales, currentLocale)) {
    setRequestLocale(currentLocale);
  } else {
    setRequestLocale(routing.defaultLocale);
  }

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <MainProvider>
        <body className={`${geist.variable} font-sans antialiased`}>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
          <GoToTop />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </MainProvider>
    </html>
  );
}
