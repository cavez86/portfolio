import '../globals.css';
import type { ReactNode } from 'react';
import { unstable_notFound as notFound } from 'waku/router/server';

import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import IntlErrorHandlingProvider from '@/components/IntlErrorHandlingProvider';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <body className="text-secondary-foreground font-sans antialiased">
        <NextIntlClientProvider>
          <IntlErrorHandlingProvider>
            <ThemeProvider defaultTheme="system">
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

export const getConfig = () => {
  return {
    render: 'static',
  } as const;
};
