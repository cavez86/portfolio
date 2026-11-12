import '../../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Schibsted_Grotesk, Spline_Sans_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import MainProvider from '@/components/providers';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Toaster } from '@/components/ui/sonner';
import { getLocalizedGlobal, getReleases } from '@/components/utils/db';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const text = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-text',
});

const code = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-code',
});

export async function generateMetadata(): Promise<Metadata> {
  const [t, personalInfo, [latest]] = await Promise.all([
    getTranslations('Metadata'),
    getLocalizedGlobal('personal-info'),
    getReleases(),
  ]);
  const position = latest?.experience.position ?? personalInfo.title;

  return {
    description: t('description', { company: latest?.experience.company ?? '', position }),
    title: t('title', { name: personalInfo.name, position }),
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
    <html className={cn(text.variable, code.variable)} lang={locale} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <MainProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </MainProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
