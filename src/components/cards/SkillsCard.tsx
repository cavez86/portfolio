import { getTranslations } from 'next-intl/server';

import { Primitive } from '@/components/common/Primitive';
import { cn } from '@/lib/utils';
import type { Skill, SoftSkill } from '@/payload-types';

const glyphColors = ['text-cobalto', 'text-pomodoro', 'text-abete', 'text-inchiostro'];

// One category per row: its name and glyph on the left, the skills as running text on the right.
// `secondary` sets the row quieter, for the soft skills.
const SkillsCard = async ({
  category,
  index,
  secondary = false,
}: {
  category: Skill | SoftSkill;
  index: number;
  secondary?: boolean;
}) => {
  const t = await getTranslations('Skills');

  return (
    <div
      className={cn(
        'grid gap-x-10 gap-y-2 border-t-2 border-inchiostro md:grid-cols-[15rem_minmax(0,1fr)]',
        secondary ? 'py-4' : 'py-5'
      )}
    >
      <h4 className="type-subheading flex items-center gap-3 md:pt-1.5">
        <Primitive className={cn('size-7 shrink-0', glyphColors[index % glyphColors.length])} index={index} />
        {t(category.name)}
      </h4>
      <p className={cn('max-w-[40ch] text-pretty', secondary ? 'type-lead' : 'type-heading')}>
        {category.skills?.map((skill) => skill.skill).join(', ')}
      </p>
    </div>
  );
};

export default SkillsCard;
