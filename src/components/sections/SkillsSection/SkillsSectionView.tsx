import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import type { Skill, SoftSkill } from '@/payload-types';

const SkillGroup = ({
  categories,
  className,
  title,
}: {
  categories: (Skill | SoftSkill)[];
  className?: string;
  title: string;
}) => (
  <div className={className}>
    <h3 className="mb-4 font-bold text-muted-foreground">{title}</h3>
    <dl className="flex flex-col divide-y divide-border border-y border-border">
      {categories.map((category) => (
        <div className="doc-columns gap-y-1 py-4" key={category.id}>
          <dt className="font-bold">{category.name}</dt>
          <dd>
            <ul className="text-pretty [&>li]:inline [&>li:not(:last-child)]:after:content-[',_']">
              {category.skills?.map(({ id, skill }) => (
                <li key={id ?? skill}>{skill}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

const SkillsSection = async () => {
  const [skills, softSkills, t] = await Promise.all([
    getLocalizedCollection('skills', ['id']),
    getLocalizedCollection('soft-skills', ['id']),
    getTranslations('Skills'),
  ]);

  return (
    <Section id="skills" title={t('title')}>
      <SkillGroup categories={skills} title={t('technical')} />
      <SkillGroup categories={softSkills} className="mt-12 text-base" title={t('soft')} />
    </Section>
  );
};

export default SkillsSection;
