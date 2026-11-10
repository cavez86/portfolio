'use client';

import { Home, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  errorCode: 404 | 500 | 403;
  handleTryAgain?: () => void;
}

// A mechanism that did not come together: the gear and the lever sit apart from the base.
const BrokenMechanism = () => (
  <svg aria-hidden="true" className="h-auto w-full max-w-72" focusable="false" viewBox="0 0 320 240">
    <rect className="fill-inchiostro" height="20" rx="10" width="280" x="20" y="204" />
    <circle className="fill-cobalto" cx="100" cy="132" r="56" />
    <circle className="fill-carta" cx="100" cy="132" r="18" />
    <circle className="fill-pomodoro" cx="226" cy="64" r="34" />
    <circle className="fill-carta" cx="226" cy="64" r="11" />
    <rect className="fill-girasole" height="18" rx="9" transform="rotate(-24 250 160)" width="96" x="208" y="150" />
  </svg>
);

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
    <div className="mx-auto grid min-h-[70vh] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:px-10">
      <div>
        <p className="type-display">{errorCode}</p>
        <h1 className="type-heading mt-6">{t(`${errorCode}.title`)}</h1>
        <p className="type-lead mt-3 max-w-[32ch]">{t(`${errorCode}.subtitle`)}</p>
        <p className="mt-3 max-w-[48ch] text-sottile">{t(`${errorCode}.description`)}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={handleGoHome}>
            <Home />
            {t('back_home')}
          </Button>

          {!!handleTryAgain && (
            <Button onClick={handleTryAgain} variant="outline">
              <RefreshCw />
              {t('try_again')}
            </Button>
          )}

          {errorCode === 404 && (
            <Button onClick={handleGoBack} variant="outline">
              {t('go_back')}
            </Button>
          )}
        </div>
      </div>
      <BrokenMechanism />
    </div>
  );
}
