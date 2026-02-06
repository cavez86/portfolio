import './globals.css';
import './themes/accessible.css';
import './themes/brutalist.css';
import './themes/editorial.css';
import './themes/glassmorphic.css';
import './themes/kinetic.css';

import { Geist } from 'next/font/google';
import { ReactNode } from 'react';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
