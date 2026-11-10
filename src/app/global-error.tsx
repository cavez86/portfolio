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
      <body className="flex min-h-screen flex-col items-start justify-center gap-4 px-5 md:px-10">
        <p className="type-display">500</p>
        <h1 className="type-heading">Something went wrong on our end</h1>
        <p className="max-w-[48ch]">The page could not be loaded. Try again in a moment.</p>
        <button
          className="bg-inchiostro text-carta hover:bg-cobalto mt-4 h-11 cursor-pointer rounded-full px-5 font-semibold transition-colors hover:text-white"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
