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

export default function ErrorPage({ errorCode, handleTryAgain }: ErrorPageProps) {
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-8 text-6xl">{getErrorIcon()}</div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-4xl font-bold text-slate-900 dark:text-white"
        >
          {t(`${errorCode}.title`)}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-xl text-slate-600 dark:text-slate-300"
        >
          {t(`${errorCode}.subtitle`)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-slate-500 dark:text-slate-400"
        >
          {t(`${errorCode}.description`)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button onClick={handleGoHome} className="flex items-center gap-2">
            <Home className="size-4" />
            {t('back_home')}
          </Button>

          {!!handleTryAgain && (
            <Button onClick={handleTryAgain} variant="outline" className="flex items-center gap-2">
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
