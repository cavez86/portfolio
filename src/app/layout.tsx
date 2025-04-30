import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/sections/Header';
import ScrollProgress from '@/components/common/ScrollProgress';
import Footer from '@/components/sections/Footer';
import { GoToTop } from '@/components/common/GoToTop';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'Francesco Caveglia Beatris - Full Stack Web Developer',
  description:
    'Full Stack Web Developer specializing in React, Next.js, TypeScript, and Tailwind CSS. Based in Torino, Italy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
