'use client';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

// Toasts are small paper-white sheets with ink type, like the dialog and the language menu.
const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    icons={{
      error: <OctagonXIcon className="size-4 text-destructive" />,
      info: <InfoIcon className="size-4" />,
      loading: <Loader2Icon className="size-4 animate-spin" />,
      success: <CircleCheckIcon className="size-4" />,
      warning: <TriangleAlertIcon className="size-4" />,
    }}
    style={
      {
        '--border-radius': 'var(--radius-sm)',
        '--error-bg': 'var(--color-carta)',
        '--error-border': 'var(--color-carta)',
        '--error-text': 'var(--color-inchiostro)',
        '--normal-bg': 'var(--color-carta)',
        '--normal-border': 'var(--color-carta)',
        '--normal-text': 'var(--color-inchiostro)',
        '--success-bg': 'var(--color-carta)',
        '--success-border': 'var(--color-carta)',
        '--success-text': 'var(--color-inchiostro)',
      } as React.CSSProperties
    }
    theme="light"
    toastOptions={{
      classNames: {
        description: '!text-inchiostro/80',
        title: '!font-semibold',
        toast: 'paper !font-sans',
      },
    }}
    {...props}
  />
);

export { Toaster };
