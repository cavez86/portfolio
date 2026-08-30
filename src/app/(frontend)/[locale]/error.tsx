'use client';

import { useEffect } from 'react';

import ErrorPage from '@/components/ErrorPage';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RouteErrorBoundary({ error: pageError, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Page error:', pageError);
  }, [pageError]);

  return <ErrorPage errorCode={500} handleTryAgain={reset} />;
}
