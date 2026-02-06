'use client';

import { createContext, ReactNode, useContext, useEffect } from 'react';

import { useStoredState } from '@/app/hooks/useStoredState';

export type ThemeVariant = 'terminal' | 'brutalist' | 'glassmorphic' | 'editorial' | 'kinetic' | 'accessible';

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useStoredState<ThemeVariant>('portfolio-theme', 'terminal');

  useEffect(() => {
    // Apply theme class to document element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
