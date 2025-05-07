import type { ReactNode } from 'react';
import { unstable_redirect as redirect } from 'waku/router/server';

import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { fallbackLng, languages } from '@/lib/i18n/constants';
import { getTranslation } from '@/lib/i18n/getTranslation';

// import '@/lib/i18n';

import '@/globals.css';

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = getTranslation('Metadata');
  // Validate that the incoming `locale` parameter is valid
  if (!languages.includes(locale)) {
    redirect(`/${fallbackLng}/`);
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <body className="text-secondary-foreground font-sans antialiased">
        <ThemeProvider defaultTheme="system">
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
          <GoToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const getConfig = () => {
  return {
    render: 'static',
  } as const;
};
