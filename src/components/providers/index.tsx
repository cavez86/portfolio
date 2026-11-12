import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { TRPCProvider } from '@/lib/trpc/client';

import IntlErrorHandlingProvider from './IntlErrorHandlingProvider';

const MainProvider = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider>
    <IntlErrorHandlingProvider>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <TRPCProvider>{children}</TRPCProvider>
      </ThemeProvider>
    </IntlErrorHandlingProvider>
  </NextIntlClientProvider>
);

export default MainProvider;
