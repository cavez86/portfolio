'use client';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = (props: ToasterProps) => (
  <Sonner
    icons={{
      error: <OctagonXIcon className="size-4 text-red-pencil" />,
      info: <InfoIcon className="size-4 text-ink" />,
      loading: <Loader2Icon className="size-4 animate-spin text-ink" />,
      success: <CircleCheckIcon className="size-4 text-green-ink" />,
      warning: <TriangleAlertIcon className="size-4 text-red-pencil" />,
    }}
    position="bottom-center"
    style={
      {
        '--border-radius': '3px',
        '--normal-bg': 'var(--color-paper)',
        '--normal-border': 'var(--color-ink)',
        '--normal-text': 'var(--color-graphite)',
      } as React.CSSProperties
    }
    theme="light"
    toastOptions={{
      classNames: {
        description: '!text-pencil',
        title: '!font-semibold !text-ink',
        toast: '!border-2 !font-sans !shadow-none',
      },
    }}
    {...props}
  />
);

export { Toaster };
