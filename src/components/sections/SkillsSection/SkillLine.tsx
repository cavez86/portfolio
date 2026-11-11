import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';
import type { Skill, SoftSkill } from '@/payload-types';

/**
 * A category as a line of the skills network: a coloured line badge, then each skill as a stop. A skill that sits
 * on more than one line is an interchange. Soft skills are footpaths: dotted, in the district's own colour.
 */
const SkillLine = ({
  category,
  colour,
  interchanges,
}: {
  category: Skill | SoftSkill;
  /** line colour; footpaths have none */
  colour?: string;
  interchanges: Set<string>;
}) => {
  const t = useTranslations('Skills');

  return (
    <div style={{ '--line': colour ?? 'var(--color-boundary)' } as CSSProperties}>
      <h4
        className={cn(
          'inline-block rounded-full px-3 py-0.5 text-small font-semibold',
          colour ? 'bg-(--line) text-notte' : 'border-2 border-(--line) text-carta/85'
        )}
      >
        {t(category.name)}
      </h4>
      <ul className={cn('mt-3 flex flex-wrap gap-y-5', colour ? 'text-lead font-semibold' : 'text-body text-carta/85')}>
        {category.skills?.map((skill) => (
          <li
            className={cn(
              'relative border-b-[5px] border-(--line) pr-7 pb-2 pl-1 transition-colors last:pr-4',
              !colour && 'border-dotted',
              'before:absolute before:-bottom-[10px] before:left-0 before:size-[15px] before:rounded-full before:border-[3px] before:border-(--line) before:bg-carta before:transition-[scale,background-color]',
              interchanges.has(skill.skill) && 'before:border-notte before:outline-[3px] before:outline-carta',
              'data-lit:text-lampione data-lit:before:scale-150 data-lit:before:bg-(--line)'
            )}
            data-skill={skill.skill}
            key={skill.id ?? skill.skill}
          >
            {skill.skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillLine;
