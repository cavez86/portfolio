'use client';

import { useTranslations } from 'next-intl';
import { Primitive } from '@/components/common/Primitive';
import type { Skill, SoftSkill } from '@/payload-types';

const glyphColors = ['text-cobalto', 'text-pomodoro', 'text-abete', 'text-inchiostro'];

const SkillsCard = ({ category, index }: { category: Skill | SoftSkill; index: number }) => {
  const t = useTranslations('Skills');

  return (
    <div className="h-full">
      <div className="flex items-center gap-4">
        <Primitive className={`size-12 shrink-0 ${glyphColors[index % glyphColors.length]}`} index={index} />
        <h4 className="type-subheading">{t(category.name)}</h4>
      </div>
      <ul className="mt-5 space-y-2.5 border-t-2 border-inchiostro pt-5">
        {category.skills?.map((skill) => (
          <li className="flex items-center gap-3 font-semibold" key={skill.id ?? skill.skill}>
            <span aria-hidden="true" className="bg-inchiostro block size-2.5 shrink-0 rounded-full" />
            {skill.skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsCard;
