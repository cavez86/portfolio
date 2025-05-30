import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

import { GoToTop } from '@/components/common/GoToTop';
import ScrollProgress from '@/components/common/ScrollProgress';
import Footer from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
      <GoToTop />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
