'use client';

import { RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';

interface ErrorPageProps {
  errorCode: 404 | 500;
  handleTryAgain?: () => void;
}

export default function ErrorPage({ errorCode, handleTryAgain }: Readonly<ErrorPageProps>) {
  const t = useTranslations('Error');
  const pathname = usePathname();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-28 lg:px-8">
      <div className="max-w-[40rem]">
        <p className="font-mono text-[clamp(3.5rem,12vw,6rem)] leading-none font-medium tracking-[-0.04em] text-primary">
          {errorCode}
        </p>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3rem)] leading-tight font-extrabold tracking-[-0.03em]">
          {t(`${errorCode}.title`)}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t(`${errorCode}.description`)}</p>
        {errorCode === 404 && (
          <dl className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y py-4">
            <dt className="text-[0.9375rem] text-muted-foreground">{t('path')}</dt>
            <dd className="min-w-0 font-mono text-[0.9375rem] break-all">{pathname}</dd>
          </dl>
        )}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {handleTryAgain ? (
            <Button onClick={handleTryAgain} size="lg">
              <RefreshCw aria-hidden />
              {t('try_again')}
            </Button>
          ) : (
            <Link className={buttonVariants({ size: 'lg' })} href="/#releases">
              {t('latest_release')}
            </Link>
          )}
          <Link className={buttonVariants({ size: 'lg', variant: 'outline' })} href="/">
            {t('back_home')}
          </Link>
        </div>
      </div>
    </main>
  );
}
