import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Geist } from 'next/font/google';
import { ReactNode, Suspense } from 'react';

import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import FooterSkeleton from '@/components/sections/FooterSkeleton';
import { Header } from '@/components/sections/Header';
import HeaderSkeleton from '@/components/sections/HeaderSkeleton';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <MainProvider>
        <body className={cn(geist.variable, 'font-sans antialiased')}>
          <ScrollProgress />
          <Suspense fallback={<HeaderSkeleton />}>
            <Header />
          </Suspense>
          {children}
          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
          <GoToTop />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </MainProvider>
    </html>
  );
}
