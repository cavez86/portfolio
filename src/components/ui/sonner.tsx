'use client';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      className="toaster group"
      icons={{
        error: <OctagonXIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
        success: <CircleCheckIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
      }}
      style={
        {
          '--border-radius': 'var(--radius-lg)',
          '--normal-bg': 'var(--color-popover)',
          '--normal-border': 'var(--color-border)',
          '--normal-text': 'var(--color-popover-foreground)',
        } as React.CSSProperties
      }
      theme={resolvedTheme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          description: 'text-muted-foreground! font-mono text-[0.8125rem]! break-all',
          toast: 'font-sans! text-[0.9375rem]! shadow-none! border!',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
