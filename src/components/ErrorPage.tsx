'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

interface ErrorPageProps {
  errorCode: 404 | 500;
  handleTryAgain?: () => void;
}

// Errors read like compiler output first, then say plainly what happened and where to go.
export default function ErrorPage({ errorCode, handleTryAgain }: Readonly<ErrorPageProps>) {
  const t = useTranslations('Error');
  const path = usePathname();

  return (
    <main className="page-frame py-16 md:py-28" id="main">
      <div className="max-w-[42rem]">
        <p className="rounded-md border border-border bg-panel px-4 py-3 font-mono text-base text-destructive [overflow-wrap:anywhere]">
          {t(`${errorCode}.compiler`, { path })}
        </p>
        <h1 className="mt-8 text-4xl leading-tight font-bold text-balance md:text-5xl">{t(`${errorCode}.title`)}</h1>
        <p className="mt-4 max-w-[52ch] text-xl text-pretty text-muted-foreground">{t(`${errorCode}.description`)}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {handleTryAgain && <Button onClick={handleTryAgain}>{t('try_again')}</Button>}
          <Link className={buttonVariants({ variant: handleTryAgain ? 'outline' : 'default' })} href="/">
            {t('back_home')}
          </Link>
          <Link className={buttonVariants({ variant: 'outline' })} href="/#contact">
            {t('contact')}
          </Link>
        </div>
      </div>
    </main>
  );
}
