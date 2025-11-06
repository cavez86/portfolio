import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from '@/lib/trpc/client';

import DayJsProvider from './DayJsProvider';
import { ThemeProvider } from './ThemeProvider';

const MainProvider = ({ children }: { children: ReactNode }) => (
  <DayJsProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TRPCProvider>
        {children}
        <Toaster />
      </TRPCProvider>
    </ThemeProvider>
  </DayJsProvider>
);

export default MainProvider;
