'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/content';
import { useLocale } from 'next-intl';

const HeroSection = () => {
  const locale = useLocale();
  const lang = locale.toUpperCase() as 'EN' | 'IT';

  return (
    <section className="px-4 py-8 md:py-16">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <motion.h1
            className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-5xl leading-normal font-bold text-transparent md:text-7xl dark:from-blue-400 dark:to-sky-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.h2
            className="text-2xl font-medium text-slate-700 md:text-3xl dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            className="mx-auto max-w-3xl text-lg text-pretty text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {personalInfo.summary[lang]}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* <Link href="#projects">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              View Projects
            </Button>
          </Link> */}
            <Link href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 md:mt-16 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {personalInfo.summaryInfo.map((item, index) => (
            <div
              key={index}
              className="bg-card flex flex-col items-center rounded-lg border p-4 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <item.icon className="mb-2 h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label[lang]}</h3>
              <p className="text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
