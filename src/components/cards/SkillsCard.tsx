'use client';

import { useTranslations } from 'next-intl';
import Icon, { type IconName } from '@/components/common/Icon';
import { Card, CardContent } from '@/components/ui/card';
import type { Skill, SoftSkill } from '@/payload-types';

const SkillsCard = ({ category }: { category: Skill | SoftSkill }) => {
  const t = useTranslations('Skills');

  return (
    <Card className="h-full transition-all">
      <CardContent>
        <div className="mb-4 flex items-center gap-3">
          <Icon className="h-6 w-6 text-primary" name={category.icon as IconName} />
          <h4 className="text-lg font-semibold font-mono uppercase tracking-wider text-foreground">
            {t(category.name)}
          </h4>
        </div>
        <ul className="space-y-2">
          {category.skills?.map((skill) => (
            <li className="flex items-center gap-2 text-foreground" key={skill.id ?? skill.skill}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_4px_var(--color-primary)]"></span>
              {skill.skill}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
