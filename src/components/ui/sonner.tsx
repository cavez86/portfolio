'use client';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    icons={{
      error: <OctagonXIcon className="size-5" />,
      info: <InfoIcon className="size-5" />,
      loading: <Loader2Icon className="size-5 animate-spin" />,
      success: <CircleCheckIcon className="size-5" />,
      warning: <TriangleAlertIcon className="size-5" />,
    }}
    style={
      {
        '--border-radius': '0px',
        '--error-bg': 'var(--color-pomodoro)',
        '--error-border': 'var(--color-inchiostro)',
        '--error-text': 'var(--color-inchiostro)',
        '--normal-bg': 'var(--color-carta)',
        '--normal-border': 'var(--color-inchiostro)',
        '--normal-text': 'var(--color-inchiostro)',
        '--success-bg': 'var(--color-girasole)',
        '--success-border': 'var(--color-inchiostro)',
        '--success-text': 'var(--color-inchiostro)',
        fontFamily: 'var(--font-archivo), system-ui, sans-serif',
      } as React.CSSProperties
    }
    theme="light"
    toastOptions={{
      classNames: {
        description: 'text-inchiostro!',
        toast: 'border-2! font-semibold! shadow-none!',
      },
    }}
    {...props}
  />
);

export { Toaster };
