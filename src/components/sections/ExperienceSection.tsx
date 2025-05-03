'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/content';
import { cn } from '@/lib/utils';
import ExperienceCard from '../cards/ExperienceCard';
import Section from '../Section';
import { useTranslations, useLocale } from 'next-intl';

const ExperienceSection = () => {
  const locale = useLocale();
  const lang = locale.toUpperCase() as 'EN' | 'IT';
  const t = useTranslations('Experience');

  return (
    <Section id="experience">
      <motion.h2
        className="text-center text-3xl font-bold text-slate-900 md:text-4xl dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </motion.h2>

      <div className="relative mt-6 flex flex-col gap-6 md:mt-12 md:gap-12">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-0 hidden w-px transform bg-slate-200 md:left-1/2 md:block dark:bg-slate-700"></div>

        {experience.map((exp, index) => (
          <motion.div
            key={index}
            className={cn('relative md:w-1/2', index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12')}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={cn(
                'absolute top-6 hidden h-3 w-3 transform rounded-full bg-blue-600 md:block dark:bg-blue-400',
                index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
              )}
            ></div>
            <div
              className={cn(
                'absolute top-7 hidden h-[2px] w-12 translate-y-1/2 transform bg-blue-600 md:block dark:bg-blue-400',
                index % 2 === 0 ? 'right-0' : 'left-0'
              )}
            ></div>
            <ExperienceCard exp={exp} align={index % 2 === 0 ? 'right' : 'left'} lang={lang} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection;
