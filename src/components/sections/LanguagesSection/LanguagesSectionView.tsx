'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { Language } from '@/payload-types';

import Section from '../../Section';

const LanguagesSection = ({ languages }: { languages: Language[] }) => {
  const t = useTranslations('Languages');

  return (
    <Section contentClassName="max-w-3xl">
      <motion.div
        className="mb-6 text-center md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">{t('title')}</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">{t('description')}</p>
      </motion.div>

      <div className="grid gap-6">
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{lang.language}</h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{lang.proficiency}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"
                        style={{ width: `${lang.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default LanguagesSection;
