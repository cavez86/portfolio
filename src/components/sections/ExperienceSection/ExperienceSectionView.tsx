import { getTranslations } from 'next-intl/server';

import ExperienceCard from '@/components/cards/ExperienceCard';
import { Motion } from '@/components/common/Motion';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

const ExperienceSection = async () => {
  const [experience, t] = await Promise.all([
    getLocalizedCollection('experience', ['-period.dateFrom']),
    getTranslations('Experience'),
  ]);

  return (
    <Section id="experience">
      <Motion
        type="h2"
        className="text-center text-3xl font-bold font-mono uppercase tracking-wider text-foreground md:text-4xl"
        initial={{ opacity: 0.1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </Motion>

      <div className="relative mt-6 flex flex-col gap-6 md:mt-12 md:gap-12">
        <div className="absolute top-0 bottom-0 left-0 hidden w-px transform bg-border md:left-1/2 md:block"></div>

        {experience.map((exp, index) => (
          <Motion
            type="div"
            key={index}
            className={cn('relative md:w-1/2', index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12')}
            initial={{ opacity: 0.1, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={cn(
                'absolute top-6 hidden h-3 w-3 transform rounded-full bg-primary md:block shadow-[0_0_8px_var(--color-primary)]',
                index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
              )}
            ></div>
            <div
              className={cn(
                'absolute top-7 hidden h-[2px] w-12 translate-y-1/2 transform bg-primary md:block',
                index % 2 === 0 ? 'right-0' : 'left-0'
              )}
            ></div>
            <ExperienceCard exp={exp} flipAlignment={index % 2 === 0} />
          </Motion>
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection;
