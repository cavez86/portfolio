'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  errorCode: 404 | 500 | 403;
  handleTryAgain?: () => void;
}

/** The trajectory that left the page: thrown from the margin, it never lands on the paper. */
const Trajectory = () => (
  <svg aria-hidden="true" className="h-auto w-full max-w-xl overflow-visible" viewBox="0 0 560 220">
    <line stroke="var(--color-graphite)" strokeWidth="2" x1="0" x2="560" y1="200" y2="200" />
    <path d="M20,196 Q250,-60 600,140" fill="none" stroke="var(--color-ink)" strokeDasharray="10 9" strokeWidth="3" />
    <circle cx="20" cy="190" fill="var(--color-paper)" r="9" stroke="var(--color-ink)" strokeWidth="3" />
    <path d="M20,190 L78,128 M64,130 L78,128 L76,142" fill="none" stroke="var(--color-red-pencil)" strokeWidth="3" />
    <text className="math" fill="var(--color-red-pencil)" fontSize="22" x="86" y="128">
      v₀
    </text>
  </svg>
);

export default function ErrorPage({ errorCode, handleTryAgain }: Readonly<ErrorPageProps>) {
  const t = useTranslations('Error');
  const common = useTranslations('Common');
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <main className="sheet flex min-h-[70vh] flex-col justify-center gap-8 py-16">
      <p className="margin-note">{common('figure', { number: errorCode })}</p>
      <Trajectory />
      <div className="max-w-[56ch]">
        <h1 className="text-[2.25rem] leading-tight md:text-title">{t(`${errorCode}.title`)}</h1>
        <p className="mt-3 text-lead text-graphite">{t(`${errorCode}.subtitle`)}</p>
        <p className="mt-3 text-pencil">{t(`${errorCode}.description`)}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button className="h-11 px-5" onClick={() => router.push('/')}>
          {t('back_home')}
        </Button>
        {!!handleTryAgain && (
          <Button className="h-11 px-5" onClick={handleTryAgain} variant="outline">
            {t('try_again')}
          </Button>
        )}
        {errorCode === 404 && (
          <Button className="h-11 px-5" onClick={handleGoBack} variant="outline">
            {t('go_back')}
          </Button>
        )}
      </div>
    </main>
  );
}
