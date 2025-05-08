import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

import DayJsProvider from './DayJsProvider';
import IntlErrorHandlingProvider from './IntlErrorHandlingProvider';
import { ThemeProvider } from './ThemeProvider';

const MainProvider = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider>
    <IntlErrorHandlingProvider>
      <DayJsProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </DayJsProvider>
    </IntlErrorHandlingProvider>
  </NextIntlClientProvider>
);

export default MainProvider;
