'use client';

import { motion } from 'framer-motion';
import { skills, softSkills } from '@/data/content';
import SkillsCard from '../cards/SkillsCard';

const SkillsSection = () => (
  <section id="skills" className="py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <motion.h2
          className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          className="text-lg text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Technical proficiencies and soft skills that drive my work
        </motion.p>
      </div>

      <div className="mx-auto mb-16 max-w-5xl">
        <h3 className="mb-8 text-center text-2xl font-bold text-slate-800 dark:text-slate-200">Technical Skills</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillsCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-8 text-center text-2xl font-bold text-slate-800 dark:text-slate-200">Soft Skills</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {softSkills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillsCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
