import { ReactScan } from '@/components/ReactScan';
import './globals.css';

import { Geist } from 'next/font/google';
import { ReactNode } from 'react';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <ReactScan />
      <body className={`${geist.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
