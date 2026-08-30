'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Loading');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <motion.div animate={{ opacity: 1 }} className="flex flex-col items-center gap-4" initial={{ opacity: 0 }}>
        <motion.div
          animate={{
            rotate: 360,
          }}
          className="border-primary h-8 w-8 rounded-full border-2 border-t-transparent"
          transition={{
            duration: 1,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
        <p className="text-slate-400">{t('loading')}</p>
      </motion.div>
    </div>
  );
}
