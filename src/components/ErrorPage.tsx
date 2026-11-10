'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { gutter } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className="min-h-[70svh] overflow-x-clip py-16 md:py-24">
      <div className={cn(gutter, 'grid gap-10 lg:grid-cols-12')}>
        <p
          aria-hidden="true"
          className="font-display text-[clamp(8rem,28vw,24rem)] leading-[0.8] font-normal tracking-[-0.04em] italic lg:col-span-6"
        >
          {errorCode}
        </p>

        <div className="flex flex-col justify-end gap-6 lg:col-span-6">
          <h1 className="font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-balance">
            {t(`${errorCode}.title`)}
          </h1>
          <p className="text-xl text-balance">{t(`${errorCode}.subtitle`)}</p>
          <p className="text-foschia max-w-[48ch] text-pretty">{t(`${errorCode}.description`)}</p>

          <div className="mt-2 flex flex-wrap gap-3">
            <Button onClick={handleGoHome} size="lg">
              {t('back_home')}
            </Button>

            {!!handleTryAgain && (
              <Button onClick={handleTryAgain} size="lg" variant="outline">
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
      </div>
    </div>
  );
}
