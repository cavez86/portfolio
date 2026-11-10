'use client';

import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  errorCode: 404 | 500 | 403;
  handleTryAgain?: () => void;
}

export default function ErrorPage({ errorCode, handleTryAgain }: Readonly<ErrorPageProps>) {
  const t = useTranslations('Error');
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-6xl flex-col items-start justify-center px-5 py-16 md:px-8">
      <p className="border-2 border-primary px-5 py-2 text-5xl font-extrabold text-primary tabular-nums outline outline-1 -outline-offset-5 outline-primary/45">
        {errorCode}
      </p>

      <h1 className="mt-8 text-district font-bold text-balance">{t(`${errorCode}.title`)}</h1>
      <p className="mt-3 max-w-prose text-lead text-pretty text-foreground/90">{t(`${errorCode}.subtitle`)}</p>
      <p className="mt-2 max-w-prose text-muted-foreground">{t(`${errorCode}.description`)}</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleGoHome} size="lg">
          {t('back_home')}
        </Button>

        {!!handleTryAgain && (
          <Button onClick={handleTryAgain} size="lg" variant="outline">
            <RefreshCw />
            {t('try_again')}
          </Button>
        )}

        {errorCode === 404 && (
          <Button onClick={handleGoBack} size="lg" variant="outline">
            {t('go_back')}
          </Button>
        )}
      </div>
    </div>
  );
}
