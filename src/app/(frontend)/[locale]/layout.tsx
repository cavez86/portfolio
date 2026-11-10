import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Sofia_Sans } from 'next/font/google';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { GoToTop } from '@/components/common/GoToTop';
import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const sofia = Sofia_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sofia',
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
    <html lang={locale} suppressHydrationWarning>
      <MainProvider>
        <body className={cn(sofia.variable, 'font-sans antialiased')}>
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
