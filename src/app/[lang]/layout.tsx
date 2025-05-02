import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/sections/Header';
import ScrollProgress from '@/components/common/ScrollProgress';
import Footer from '@/components/sections/Footer';
import { GoToTop } from '@/components/common/GoToTop';
import { ReactNode } from 'react';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'Francesco Caveglia Beatris - Full Stack Web Developer',
  description:
    'Full Stack Web Developer specializing in React, Next.js, TypeScript, and Tailwind CSS. Based in Torino, Italy.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
