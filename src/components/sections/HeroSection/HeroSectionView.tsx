'use client';

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { use } from 'react';

import Icon, { IconName } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { PersonalInfo, SummaryInfo } from '@/payload-types';

const HeroSection = ({
  personalInfo,
  summaryInfo,
}: {
  personalInfo: Promise<PersonalInfo>;
  summaryInfo: Promise<SummaryInfo[]>;
}) => {
  const personalInfoData = use(personalInfo);
  const summaryInfoData = use(summaryInfo);
  const t = useTranslations('Hero');

  return (
    <section className="px-4 py-8 md:py-16">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <motion.h1
            className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-5xl leading-normal font-bold text-transparent md:text-7xl dark:from-blue-400 dark:to-sky-300"
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {personalInfoData.name}
          </motion.h1>

          <motion.h2
            className="text-2xl font-medium text-slate-700 md:text-3xl dark:text-slate-300"
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {personalInfoData.title}
          </motion.h2>

          <motion.div
            className="mx-auto text-lg text-pretty text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0.1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <RichText data={personalInfoData.description as SerializedEditorState} />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0.1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                {t('contact_me')}
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 md:mt-16 md:grid-cols-4"
          initial={{ opacity: 0.1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {summaryInfoData.map((item, index) => (
            <div
              key={index}
              className="bg-card flex flex-col items-center rounded-lg border p-4 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <Icon name={item.icon as IconName} className="mb-2 h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{t(item.label)}</h3>
              <p className="text-base font-semibold text-slate-900 dark:text-white">{t(item.value)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
