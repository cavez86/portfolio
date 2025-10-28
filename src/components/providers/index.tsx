import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

import { TRPCProvider } from '@/lib/trpc/client';

import DayJsProvider from './DayJsProvider';
import IntlErrorHandlingProvider from './IntlErrorHandlingProvider';
import { ThemeProvider } from './ThemeProvider';

const MainProvider = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider>
    <IntlErrorHandlingProvider>
      <DayJsProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCProvider>{children}</TRPCProvider>
        </ThemeProvider>
      </DayJsProvider>
    </IntlErrorHandlingProvider>
  </NextIntlClientProvider>
);

export default MainProvider;
