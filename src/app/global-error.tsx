'use client';

import posthog from 'posthog-js';
import { useEffect } from 'react';

import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col items-start justify-center px-5 py-16 md:px-8">
          <p className="border-2 border-primary px-5 py-2 text-5xl font-extrabold text-primary tabular-nums">500</p>
          <h1 className="mt-8 text-district font-bold text-balance">Something went wrong on our end</h1>
          <p className="mt-3 max-w-prose text-lead text-foreground/90">
            We're experiencing technical difficulties. Please try again later.
          </p>
          <button
            className="mt-10 inline-flex h-12 cursor-pointer items-center rounded-sm bg-primary px-6 text-body font-semibold text-primary-foreground hover:bg-[#ffc062]"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
