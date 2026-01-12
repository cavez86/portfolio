import dayjs from 'dayjs';
import { Maximize2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';

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
        <Card className={cn(flipAlignment ? 'md:ml-4' : 'md:mr-4', 'group/card cursor-pointer hover:bg-card/80')}>
          <CardContent>
            <div
              className={cn(
                'relative flex flex-col items-start',
                flipAlignment ? 'md:items-end md:text-end' : 'md:items-start md:text-start'
              )}
            >
              <Maximize2
                className={cn(
                  'absolute top-0 h-3 w-3 text-primary opacity-50 transition',
                  'group-hover/card:scale-150 group-hover/card:opacity-100',
                  'right-0',
                  flipAlignment && 'md:left-0 md:right-auto'
                )}
              />
              <Badge className="mb-2 inline-block w-auto">{periodLabel}</Badge>
              <h3 className="text-xl font-bold font-mono uppercase tracking-wider text-foreground">{exp.company}</h3>
              <p className="mb-2 text-xs text-muted-foreground">{exp.location}</p>
              <p className="mb-4 text-muted-foreground">{exp.position}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{exp.company}</DialogTitle>
          <DialogDescription>{periodLabel}</DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-2 pl-5 text-left text-foreground [&_a]:underline [&_a]:text-accent [&_a]:hover:text-primary">
          {exp.achievements?.map((achievement, idx) => (
            <li key={idx}>
              <span className="font-semibold">{achievement.label}</span>: <Markdown>{achievement.description}</Markdown>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceCard;
