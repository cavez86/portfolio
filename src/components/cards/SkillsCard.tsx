'use client';

import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { Skill, SoftSkill } from '@/payload-types';

import Icon, { IconName } from '../common/Icon';

const SkillsCard = ({ category }: { category: Skill | SoftSkill }) => {
  const t = useTranslations('Skills');

  return (
    <Card className="h-full transition-all">
      <CardContent>
        <div className="mb-4 flex items-center gap-3">
          <Icon name={category.icon as IconName} className="h-6 w-6 text-primary" />
          <h4 className="text-lg font-semibold font-mono uppercase tracking-wider text-foreground">
            {t(category.name)}
          </h4>
        </div>
        <ul className="space-y-2">
          {category.skills?.map((skill, skillIndex) => (
            <li key={skillIndex} className="flex items-center gap-2 text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary dark:shadow-[0_0_4px_var(--color-primary)]"></span>
              {skill.skill}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
