'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { LucideProps } from 'lucide-react';
import { ComponentType } from 'react';

const SkillsCard = ({
  category,
}: {
  category: {
    name: string;
    icon: ComponentType<LucideProps>;
    skills: string[];
  };
}) => (
  <Card className="h-full transition-shadow hover:shadow-md">
    <CardContent className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{category.name}</h4>
      </div>
      <ul className="space-y-2">
        {category.skills.map((skill, skillIndex) => (
          <li key={skillIndex} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            {skill}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default SkillsCard;
