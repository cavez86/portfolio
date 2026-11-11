import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, STIX_Two_Text } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const bricolage = Bricolage_Grotesque({
  axes: ['opsz'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
});

// Only for what physics typesetting sets in italic: variables, units and figure captions.
const stix = STIX_Two_Text({
  style: 'italic',
  subsets: ['latin', 'greek'],
  variable: '--font-stix',
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
    <html className={cn(bricolage.variable, stix.variable)} lang={locale} suppressHydrationWarning>
      <MainProvider>
        <body className="font-sans antialiased">
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
