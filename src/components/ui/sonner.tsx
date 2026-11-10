'use client';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    icons={{
      error: <OctagonXIcon className="size-5 text-destructive" />,
      info: <InfoIcon className="size-5 text-accent" />,
      loading: <Loader2Icon className="size-5 animate-spin motion-reduce:animate-none" />,
      success: <CircleCheckIcon className="size-5 text-accent" />,
      warning: <TriangleAlertIcon className="size-5 text-primary" />,
    }}
    style={
      {
        '--border-radius': 'var(--radius-md)',
        '--normal-bg': 'var(--color-popover)',
        '--normal-border': 'var(--color-primary)',
        '--normal-text': 'var(--color-popover-foreground)',
      } as React.CSSProperties
    }
    theme="dark"
    toastOptions={{
      classNames: {
        description: '!text-muted-foreground',
        title: '!font-semibold',
        toast: '!border-2 !font-sans !shadow-none',
      },
    }}
    {...props}
  />
);

export { Toaster };
