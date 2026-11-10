import { getTranslations } from 'next-intl/server';
import SkillsCard from '@/components/cards/SkillsCard';
import Section, { SectionHeading } from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';

const SkillsSection = async () => {
  const [skillsData, softSkillsData, t] = await Promise.all([
    getLocalizedCollection('skills', ['-ID']),
    getLocalizedCollection('soft-skills', ['-ID']),
    getTranslations('Skills'),
  ]);

  return (
    <Section heading={<SectionHeading description={t('description')} title={t('title')} />} id="skills">
      <h3 className="text-xl font-bold text-primary">{t('technical')}</h3>
      <div className="mt-2 border-t border-border">
        {skillsData.map((category) => (
          <SkillsCard category={category} key={category.id} />
        ))}
      </div>

      <h3 className="mt-14 text-lg font-bold text-muted-foreground">{t('soft')}</h3>
      <div className="mt-2 border-t border-border">
        {softSkillsData.map((category) => (
          <SkillsCard category={category} key={category.id} secondary />
        ))}
      </div>
    </Section>
  );
};

export default SkillsSection;
