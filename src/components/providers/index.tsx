import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import { TRPCProvider } from '@/lib/trpc/client';

import IntlErrorHandlingProvider from './IntlErrorHandlingProvider';

const MainProvider = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider>
    <IntlErrorHandlingProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </IntlErrorHandlingProvider>
  </NextIntlClientProvider>
);

export default MainProvider;
