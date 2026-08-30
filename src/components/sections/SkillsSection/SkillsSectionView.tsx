import { getTranslations } from 'next-intl/server';
import SkillsCard from '@/components/cards/SkillsCard';
import { Motion } from '@/components/common/Motion';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const SkillsSection = async () => {
  const [skillsData, softSkillsData, t] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
  ]);

  return (
    <Section contentClassName="max-w-5xl flex flex-col gap-6 md:gap-12" id="skills">
      <div className="text-center">
        <Motion
          className="mb-2 text-3xl font-bold font-mono uppercase tracking-wider text-foreground md:mb-4 md:text-4xl"
          initial={{ opacity: 0.1, y: 20 }}
          transition={{ duration: 0.5 }}
          type="h2"
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t('title')}
        </Motion>
        <Motion
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0.1, y: 20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          type="p"
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
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
              className="min-w-75 flex-1"
              initial={{ opacity: 0.1, y: 20 }}
              key={category.id}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              type="div"
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
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
              className="min-w-75 flex-1"
              initial={{ opacity: 0.1, y: 20 }}
              key={category.id}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              type="div"
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
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
