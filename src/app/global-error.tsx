'use client';

import './globals.css';

import posthog from 'posthog-js';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Rendered outside the locale layout, so it brings its own markup and falls back to the system didone stack.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col items-start justify-center gap-6 p-6 sm:p-16">
        <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-none font-medium tracking-tight text-balance">
          Something went wrong
        </h1>
        <p className="text-foschia max-w-[48ch] text-lg text-pretty">
          The page could not be displayed. Try again, and if it keeps happening, come back in a few minutes.
        </p>
        <button
          className="bg-carta text-savoia hover:bg-notte hover:text-carta h-12 cursor-pointer rounded-sm px-6 text-base font-medium transition-colors"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
