import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import IntlErrorHandlingProvider from './IntlErrorHandlingProvider';
import DayJsProvider from './DayJsProvider';
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
