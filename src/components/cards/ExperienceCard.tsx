import dayjs from 'dayjs';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Experience } from '@/payload-types';
import { getBar, positionOf, type TimelineAxis } from '../sections/ExperienceSection/timeline';

const ExperienceCard = ({ exp, axis }: { exp: Experience; axis: TimelineAxis }) => {
  const t = useTranslations('Experience');
  const periodLabel = `${dayjs(exp.period.dateFrom).format('YYYY')} - ${exp.period.dateTo ? dayjs(exp.period.dateTo).format('YYYY') : t('present')}`;
  const bar = getBar(exp, axis);

  return (
    <Dialog>
      <DialogTrigger className="group/row grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-5 border-t-2 border-current px-0 py-6 text-left transition-colors hover:bg-carta hover:text-cobalto md:grid-cols-[14rem_minmax(0,1fr)_minmax(0,1.1fr)_auto] md:gap-x-8 md:px-4 md:py-7 [&:hover]:[--focus:var(--color-inchiostro)]">
        <span className="type-heading col-start-1 row-start-2 whitespace-nowrap md:col-start-1 md:row-start-1">
          {periodLabel}
        </span>
        <span className="col-start-1 row-start-1 flex flex-col gap-0.5 md:col-start-2">
          <span className="type-subheading">{exp.company}</span>
          <span className="type-small">{exp.position}</span>
          <span className="type-small opacity-90">{exp.location}</span>
        </span>
        <span
          aria-hidden="true"
          className="relative col-span-2 row-start-3 block h-7 md:col-span-1 md:col-start-3 md:row-start-1"
        >
          {axis.ticks.map((tick) => (
            <span
              className="absolute top-0 bottom-0 block w-px bg-current opacity-30"
              key={tick}
              style={{ left: `${positionOf(tick, axis)}%` }}
            />
          ))}
          <span
            className="bg-girasole group-hover/row:bg-pomodoro absolute top-1.5 block h-4 rounded-full transition-colors"
            style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
          />
          {bar.ongoing && (
            <span
              className="bg-carta border-pomodoro absolute top-0 block size-7 -translate-x-full rounded-full border-[6px]"
              style={{ left: '100%' }}
            />
          )}
        </span>
        <span className="border-current col-start-2 row-span-2 row-start-1 flex size-11 items-center justify-center self-start rounded-full border-2 transition-transform group-hover/row:rotate-90 md:col-start-4 md:row-span-1 md:self-center">
          <Plus aria-hidden="true" className="size-5" />
          <span className="sr-only">{t('more')}</span>
        </span>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{exp.company}</DialogTitle>
          <DialogDescription>
            {periodLabel}
            {exp.position ? `, ${exp.position}` : ''}
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-6">
          {exp.achievements?.map((achievement) => (
            <li
              className="grid grid-cols-[1rem_1fr] gap-x-4"
              key={achievement.id ?? `${achievement.label}-${achievement.description}`}
            >
              <span aria-hidden="true" className="bg-pomodoro mt-2 block size-3.5 rounded-full" />
              <div>
                <h4 className="type-subheading">{achievement.label.replace(/:\s*$/, '')}</h4>
                <div className="mt-1 max-w-[62ch] [&_a]:text-cobalto [&_a]:underline [&_a]:underline-offset-4">
                  <Markdown>{achievement.description}</Markdown>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceCard;
