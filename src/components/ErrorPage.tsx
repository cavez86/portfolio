'use client';

import { Home, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
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

  const getErrorIcon = () => {
    switch (errorCode) {
      case 404:
        return '🔍';
      case 500:
        return '⚠️';
      case 403:
        return '🔒';
      default:
        return '❌';
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-6xl">{getErrorIcon()}</div>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-4xl font-bold font-mono uppercase tracking-wider text-foreground"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {t(`${errorCode}.title`)}
        </motion.h1>

        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-xl text-foreground"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t(`${errorCode}.subtitle`)}
        </motion.h2>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t(`${errorCode}.description`)}
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button className="flex items-center gap-2" onClick={handleGoHome}>
            <Home className="size-4" />
            {t('back_home')}
          </Button>

          {!!handleTryAgain && (
            <Button className="flex items-center gap-2" onClick={handleTryAgain} variant="outline">
              <RefreshCw className="size-4" />
              {t('try_again')}
            </Button>
          )}

          {errorCode === 404 && (
            <Button onClick={handleGoBack} variant="outline">
              {t('go_back')}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
