import SkillsCard from '@/components/cards/SkillsCard';
import { Motion } from '@/components/common/Motion';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { getTranslations } from 'next-intl/server';

const SkillsSection = async () => {
  const [skillsData, softSkillsData, t] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
  ]);

  return (
    <Section id="skills" contentClassName="max-w-5xl flex flex-col gap-6 md:gap-12">
      <div className="text-center">
        <Motion
          type="h2"
          className="mb-2 text-3xl font-bold font-mono uppercase tracking-wider text-foreground md:mb-4 md:text-4xl"
          initial={{ opacity: 0.1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </Motion>
        <Motion
          type="p"
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0.1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('description')}
        </Motion>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <h3 className="text-center text-2xl font-bold font-mono uppercase tracking-wider text-primary">
          {t('technical')}
        </h3>
        <div className="flex flex-wrap gap-6">
          {skillsData.map((category, index) => (
            <Motion
              type="div"
              key={index}
              initial={{ opacity: 0.1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-75 flex-1"
            >
              <SkillsCard category={category} />
            </Motion>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <h3 className="text-center text-2xl font-bold font-mono uppercase tracking-wider text-primary">{t('soft')}</h3>
        <div className="flex flex-wrap gap-6">
          {softSkillsData.map((category, index) => (
            <Motion
              type="div"
              key={index}
              initial={{ opacity: 0.1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-75 flex-1"
            >
              <SkillsCard category={category} />
            </Motion>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
