import '../styles.css';

import type { ReactNode } from 'react';

import ScrollProgress from '@/components/common/ScrollProgress';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';

type RootLayoutProps = { children: ReactNode };

const RootLayout = async ({ children }: RootLayoutProps) => {
  const data = await getData();

  return (
    <html>
      <head>
        <title>{data.description}</title>
        <meta name="description" content={data.description} />
        <link rel="icon" type="image/png" href={data.icon} />
      </head>
      <body className="text-secondary-foreground font-sans antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

const getData = () => {
  const data = {
    description: 'An internet website!',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = () => {
  return {
    render: 'static',
  } as const;
};
