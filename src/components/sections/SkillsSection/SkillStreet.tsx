import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import type { Skill, SoftSkill } from '@/payload-types';

/**
 * A category as a street: its name is the street name, its skills stand along it with a lamp between each.
 * Lit streets carry the technical skills; unlit ones the soft skills.
 */
const SkillStreet = ({ category, lit = false }: { category: Skill | SoftSkill; lit?: boolean }) => {
  const t = useTranslations('Skills');

  return (
    <div>
      <h4 className="text-small font-semibold text-muted-foreground">{t(category.name)}</h4>
      <ul
        className={cn(
          'mt-2 flex flex-wrap gap-y-4',
          lit ? 'text-lead font-semibold text-carta' : 'text-body text-carta/80'
        )}
      >
        {category.skills?.map((skill) => (
          <li
            className={cn(
              'relative border-b-[3px] pr-8 pb-1.5 last:pr-3',
              'after:absolute after:-right-px after:-bottom-[7px] after:size-[11px] after:-translate-x-[14px] after:rounded-full after:border-[2.5px] after:border-isolato last:after:hidden',
              lit ? 'border-lampione after:bg-[#ffd28c]' : 'border-street after:bg-street'
            )}
            key={skill.id ?? skill.skill}
          >
            {skill.skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillStreet;
