'use client';

import { useEffect } from 'react';

import ErrorPage from '@/components/ErrorPage';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return <ErrorPage errorCode={500} handleTryAgain={reset} />;
}
