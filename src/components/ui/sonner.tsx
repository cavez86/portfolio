'use client';

import { CircleCheckIcon, OctagonXIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

// Colours come from the page tokens, so toasts follow the active theme without knowing it.
const Toaster = (props: ToasterProps) => (
  <Sonner
    className="toaster group"
    icons={{
      error: <OctagonXIcon className="size-4 text-destructive" />,
      success: <CircleCheckIcon className="size-4 text-primary" />,
    }}
    style={
      {
        '--border-radius': 'var(--radius-md)',
        '--normal-bg': 'var(--panel)',
        '--normal-border': 'var(--rule)',
        '--normal-text': 'var(--ink)',
      } as CSSProperties
    }
    toastOptions={{
      classNames: {
        description: 'text-muted-foreground!',
        title: 'font-semibold!',
        toast: 'font-sans! text-base! shadow-none!',
      },
    }}
    {...props}
  />
);

export { Toaster };
