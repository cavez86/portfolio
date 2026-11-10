import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/utils';
import type { Skill, SoftSkill } from '@/payload-types';

/**
 * Skills are set as running text, one line of type per category: technical skills in the display face at
 * specimen size, soft skills in a smaller text face so they read as secondary.
 */
const SkillsGroup = async ({
  categories,
  secondary = false,
}: {
  categories: Array<Skill | SoftSkill>;
  secondary?: boolean;
}) => {
  const t = await getTranslations('Skills');

  return (
    <dl
      className={cn(
        'border-border divide-border divide-y border-y',
        secondary && 'md:grid md:grid-cols-3 md:divide-y-0'
      )}
    >
      {categories.map((category) => (
        <div
          className={cn(
            'grid gap-x-8 gap-y-2',
            secondary
              ? 'md:border-border py-5 md:block md:px-6 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l'
              : 'py-6 md:grid-cols-[15rem_1fr] md:py-7'
          )}
          key={category.id}
        >
          <dt
            className={cn(
              'leading-snug font-semibold text-balance',
              secondary ? 'mb-2 text-base' : 'text-base md:pt-2'
            )}
          >
            {t(category.name)}
          </dt>
          <dd
            className={cn(
              secondary
                ? 'text-foschia text-base leading-relaxed'
                : 'font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.25] tracking-tight'
            )}
          >
            {category.skills?.map((skill, index) => (
              <span key={skill.id ?? skill.skill}>
                {index > 0 && ', '}
                <span className="whitespace-nowrap">{skill.skill}</span>
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default SkillsGroup;
