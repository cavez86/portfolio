import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Instrument_Sans } from 'next/font/google';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

// Bodoni Moda is the specimen: its optical-size axis is what makes the name hairline-sharp at 300px
// and still readable at 20px, so both axes are loaded in roman and italic.
const bodoni = Bodoni_Moda({
  axes: ['opsz'],
  display: 'swap',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-bodoni',
});

const instrumentSans = Instrument_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-text',
});

export const viewport: Viewport = {
  themeColor: '#4458C8',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    description: t('description'),
    title: t('title'),
  };
}

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('Common')]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <MainProvider>
        <body className={cn(bodoni.variable, instrumentSans.variable, 'font-sans antialiased')}>
          <a
            className="focus-visible:bg-carta focus-visible:text-savoia sr-only z-70 rounded-sm px-4 py-2 font-medium focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3"
            href="#main"
          >
            {t('skip_to_content')}
          </a>
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
