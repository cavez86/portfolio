import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import { TRPCProvider } from '@/lib/trpc/client';

import DayJsProvider from './DayJsProvider';
import IntlErrorHandlingProvider from './IntlErrorHandlingProvider';

const MainProvider = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider>
    <IntlErrorHandlingProvider>
      <DayJsProvider>
        <TRPCProvider>{children}</TRPCProvider>
      </DayJsProvider>
    </IntlErrorHandlingProvider>
  </NextIntlClientProvider>
);

export default MainProvider;
