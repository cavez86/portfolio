import { getTranslations } from 'next-intl/server';

import { WheelPart } from '@/components/sections/SkillsSection/wheelParts';
import { cn } from '@/lib/utils';
import type { Skill, SoftSkill } from '@/payload-types';

// One category per row: its name on the left, the skills as running text on the right. A technical
// category carries its wheel part (`index`); soft skills have no part and are set quieter.
const SkillsCard = async ({ category, index }: { category: Skill | SoftSkill; index?: number }) => {
  const secondary = index === undefined;
  const t = await getTranslations('Skills');

  return (
    <div
      className={cn(
        'grid gap-x-10 gap-y-2 border-t-2 border-inchiostro md:grid-cols-[15rem_minmax(0,1fr)]',
        secondary ? 'py-4' : 'py-5'
      )}
    >
      <h4 className="type-subheading flex items-center gap-3 md:pt-1.5">
        {!secondary && <WheelPart className="size-9 shrink-0" index={index} />}
        {t(category.name)}
      </h4>
      <p className={cn('max-w-[40ch] text-pretty', secondary ? 'type-lead' : 'type-heading')}>
        {category.skills?.map((skill) => skill.skill).join(', ')}
      </p>
    </div>
  );
};

export default SkillsCard;
