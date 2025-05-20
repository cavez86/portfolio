import dayjs from 'dayjs';
import { Maximize2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Experience } from '@/payload-types';

import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const ExperienceCard = ({ exp, flipAlignment }: { exp: Experience; flipAlignment: boolean }) => {
  const t = useTranslations('Experience');
  const periodLabel = `${dayjs(exp.period.dateFrom).format('YYYY')} - ${exp.period.dateTo ? dayjs(exp.period.dateTo).format('YYYY') : t('present')}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn(
            flipAlignment ? 'md:ml-4' : 'md:mr-4',
            'group/card cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
        >
          <CardContent>
            <div
              className={cn(
                'relative flex flex-col items-start',
                flipAlignment ? 'md:items-end md:text-end' : 'md:items-start md:text-start'
              )}
            >
              <Maximize2
                className={cn(
                  'absolute top-0 h-3 w-3 text-blue-800 opacity-50 transition dark:text-blue-300',
                  'group-hover/card:scale-150 group-hover/card:opacity-100',
                  flipAlignment ? 'left-0' : 'right-0'
                )}
              />
              <Badge className="mb-2 inline-block w-auto bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50">
                {periodLabel}
              </Badge>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.company}</h3>
              <p className="mb-2 text-xs text-slate-600 dark:text-slate-400">{exp.location}</p>
              <p className="mb-4 text-slate-600 dark:text-slate-400">{exp.position}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{exp.company}</DialogTitle>
          <DialogDescription>{periodLabel}</DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceCard;
