'use client';

import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@/components/ui/card';
import type { skills, softSkills } from '@/data/content';

const SkillsCard = ({ category }: { category: (typeof skills | typeof softSkills)[number] }) => {
  const { t, i18n } = useTranslation('Skills');
  const lang = i18n.language.toUpperCase() as 'EN' | 'IT';

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{t(category.name)}</h4>
        </div>
        <ul className="space-y-2">
          {category.skills.map((skill, skillIndex) => (
            <li key={skillIndex} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              {typeof skill === 'string' ? skill : skill[lang]}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
