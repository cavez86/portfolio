import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import ScrollProgress from '@/components/common/ScrollProgress';
import { Header } from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { GoToTop } from '@/components/common/GoToTop';
import IntlErrorHandlingProvider from '@/components/IntlErrorHandlingProvider';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <IntlErrorHandlingProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ScrollProgress />
              <Header />
              {children}
              <Footer />
              <GoToTop />
            </ThemeProvider>
          </IntlErrorHandlingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
