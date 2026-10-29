'use client';

import NextError from 'next/error';
import posthog from 'posthog-js';
import { useEffect } from 'react';

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
        <NextError statusCode={0} />
        <button onClick={reset} type="button">
          Try again
        </button>
      </body>
    </html>
  );
}
