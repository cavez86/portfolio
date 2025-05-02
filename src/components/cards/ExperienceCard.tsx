import { Card, CardContent } from '@/components/ui/card';
import { experience } from '@/data/content';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

const ExperienceCard = ({ exp, align }: { exp: (typeof experience)[number]; align: 'left' | 'right' }) => (
  <Card className={cn(align === 'left' ? 'md:mr-4' : 'md:ml-4')}>
    <CardContent className="p-6">
      <div
        className={cn(
          'flex flex-col items-start',
          align === 'left' ? 'md:items-start md:text-start' : 'md:items-end md:text-end'
        )}
      >
        <Badge className="mb-2 inline-block w-auto bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50">
          {exp.period}
        </Badge>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.company}</h3>
        <p className="mb-4 text-slate-600 dark:text-slate-400">{exp.position}</p>

        {exp.description && (
          <p className="list-disc space-y-2 text-slate-700 md:list-none dark:text-slate-300">{exp.description}</p>
        )}
        <ul className="list-disc space-y-2 pl-5 text-left text-slate-700 dark:text-slate-300">
          {exp.achievements?.map((achievement, idx) => (
            <li key={idx}>
              <span className="font-semibold">{achievement.label}</span>: {achievement.description}
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);

export default ExperienceCard;
