import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';
import type { Skill, SoftSkill } from '@/payload-types';

/** A tech-stack table: one row per group, its items set as wrapping text. */
const SkillTable = ({ groups, secondary }: { groups: (Skill | SoftSkill)[]; secondary?: boolean }) => (
  <dl className={cn('divide-y border-y', secondary && 'text-[0.9375rem]')}>
    {groups.map((group) => (
      <div className="grid gap-x-8 gap-y-1.5 py-4 sm:grid-cols-[13rem_1fr]" key={group.id}>
        <dt className={cn('font-semibold', secondary && 'text-muted-foreground')}>{group.name}</dt>
        <dd>
          <ul className={cn(secondary && 'text-muted-foreground')}>
            {group.skills?.map((item) => (
              <li className="inline after:content-[',_'] last:after:content-none" key={item.id ?? item.skill}>
                {item.skill}
              </li>
            ))}
          </ul>
        </dd>
      </div>
    ))}
  </dl>
);

const SkillsSection = async () => {
  const [skills, softSkills, t] = await Promise.all([
    getLocalizedCollection('skills', ['id']),
    getLocalizedCollection('soft-skills', ['id']),
    getTranslations('Skills'),
  ]);

  return (
    <Section id="skills" title={t('title')}>
      <h3 className="mb-3 text-lg font-bold">{t('technical')}</h3>
      <SkillTable groups={skills} />
      <h3 className="mt-12 mb-3 text-base font-semibold text-muted-foreground">{t('soft')}</h3>
      <SkillTable groups={softSkills} secondary />
    </Section>
  );
};

export default SkillsSection;
