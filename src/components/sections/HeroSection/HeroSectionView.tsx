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
            className="bg-linear-to-r from-primary to-accent bg-clip-text text-5xl leading-normal font-bold font-mono uppercase tracking-wider text-transparent md:text-7xl dark:[text-shadow:0_0_30px_var(--color-primary)]"
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {personalInfoData.name}
          </motion.h1>

          <motion.h2
            className="text-2xl font-medium font-mono uppercase tracking-wider text-accent md:text-3xl"
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {personalInfoData.title}
          </motion.h2>

          <motion.div
            className="mx-auto text-lg text-pretty text-muted-foreground"
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
              <Button size="lg" variant="outline">
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
              className="bg-card flex flex-col items-center border-2 border-primary/30 p-4 text-center transition-all hover:border-primary/60 dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_0_20px_var(--color-primary)]"
            >
              <Icon name={item.icon as IconName} className="mb-2 h-8 w-8 text-primary" />
              <h3 className="text-sm font-medium font-mono uppercase tracking-wider text-muted-foreground">
                {t(item.label)}
              </h3>
              <p className="text-base font-semibold font-mono text-foreground">{t(item.value)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
