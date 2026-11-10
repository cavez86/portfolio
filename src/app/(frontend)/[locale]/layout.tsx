import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Toaster } from '@/components/ui/sonner';

const archivo = Archivo({
  axes: ['wdth'],
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-archivo',
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    description: t('description'),
    title: t('title'),
  };
}

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html className={archivo.variable} lang={locale} suppressHydrationWarning>
      <MainProvider>
        <body className={'font-sans antialiased'}>
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
