import { useTranslations } from 'next-intl';

import Icon, { type IconName } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import type { Skill, SoftSkill } from '@/payload-types';

/** One row of the skills board: the category, then its skills set as a run of words. Soft skills are quieter. */
const SkillsCard = ({ category, secondary = false }: { category: Skill | SoftSkill; secondary?: boolean }) => {
  const t = useTranslations('Skills');

  return (
    <div className="grid gap-x-8 gap-y-1.5 border-b border-border py-4 md:grid-cols-[13rem_minmax(0,1fr)]">
      <h4 className="flex items-start gap-2.5 text-body font-semibold text-accent">
        <Icon aria-hidden="true" className="mt-1 size-4 shrink-0" name={category.icon as IconName} />
        {t(category.name)}
      </h4>
      <ul
        className={cn(
          'flex flex-wrap gap-x-5 gap-y-0.5',
          secondary ? 'text-body text-muted-foreground' : 'text-lead font-semibold text-foreground'
        )}
      >
        {category.skills?.map((skill) => (
          <li key={skill.id ?? skill.skill}>{skill.skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsCard;
