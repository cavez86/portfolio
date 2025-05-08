'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Skill, SoftSkill } from '@/payload-types';

import SkillsCard from '../../cards/SkillsCard';
import Section from '../../Section';

const SkillsSection = ({ skills, softSkills }: { skills: Skill[]; softSkills: SoftSkill[] }) => {
  const t = useTranslations('Skills');

  return (
    <Section id="skills" contentClassName="max-w-5xl flex flex-col gap-6 md:gap-12">
      <div className="text-center">
        <motion.h2
          className="mb-2 text-3xl font-bold text-slate-900 md:mb-4 md:text-4xl dark:text-white"
          initial={{ opacity: 0.1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className="text-lg text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0.1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('description')}
        </motion.p>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <h3 className="text-center text-2xl font-bold text-slate-800 dark:text-slate-200">{t('technical')}</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillsCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <h3 className="text-center text-2xl font-bold text-slate-800 dark:text-slate-200">{t('soft')}</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {softSkills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillsCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
