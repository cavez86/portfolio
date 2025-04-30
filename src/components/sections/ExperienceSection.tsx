'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/content';
import { cn } from '@/lib/utils';
import ExperienceCard from '../cards/ExperienceCard';

const ExperienceSection = () => (
  <section id="experience" className="py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold text-slate-900 md:text-4xl dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h2>

        <div className="relative mt-12 flex flex-col gap-12">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-px transform bg-slate-200 md:left-1/2 md:block md:translate-x-px dark:bg-slate-700"></div>

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
                  index % 2 === 0 ? 'right-0 translate-x-1.5' : 'left-0 -translate-x-1.5'
                )}
              ></div>
              <ExperienceCard exp={exp} align={index % 2 === 0 ? 'right' : 'left'} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
