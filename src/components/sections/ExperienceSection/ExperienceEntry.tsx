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

/** Shared by the entries and the scale caption so the axis lines up. */
export const entryGrid = 'grid grid-cols-[1fr_auto] gap-x-6 lg:grid-cols-[13rem_1fr_24rem_5rem] lg:gap-x-10';
/** The axis column: under the period on narrow screens, its own column on wide ones. */
export const axisCell = 'col-span-2 lg:col-span-1 lg:col-start-3';

/** Every entry is drawn on the same axis, from the first job to today, so tenure reads at a glance. */
export type CareerAxis = { start: number; end: number };

const ExperienceEntry = ({ exp, axis }: { exp: Experience; axis: CareerAxis }) => {
  const t = useTranslations('Experience');
  const isCurrent = !exp.period.dateTo;
  const from = dayjs(exp.period.dateFrom);
  const to = exp.period.dateTo ? dayjs(exp.period.dateTo) : dayjs(axis.end);
  const years = Math.max(1, Math.round(to.diff(from, 'month') / 12));
  const span = axis.end - axis.start;
  const periodLabel = `${dayjs(exp.period.dateFrom).format('YYYY')} – ${exp.period.dateTo ? dayjs(exp.period.dateTo).format('YYYY') : t('present')}`;

  return (
    <Dialog>
      <DialogTrigger
        className={`group/entry hover:bg-notte focus-visible:bg-notte data-popup-open:bg-notte -mx-4 w-[calc(100%+2rem)] cursor-pointer gap-y-3 px-4 py-6 text-left transition-colors duration-200 md:py-7 ${entryGrid}`}
        type="button"
      >
        <span className="col-span-2 flex items-center gap-2 text-base font-medium tabular-nums lg:col-span-1 lg:self-start lg:pt-1.5">
          {isCurrent && <span aria-hidden="true" className="bg-oro size-2 shrink-0 rounded-full" />}
          {periodLabel}
          <span className="text-foschia font-normal">{t('years', { count: years })}</span>
        </span>
        <span
          aria-hidden="true"
          className={`bg-notte group-hover/entry:bg-savoia relative block h-2.5 self-start lg:mt-3 lg:row-start-1 ${axisCell}`}
        >
          <span
            className="bg-carta absolute inset-y-0 block"
            style={{
              left: `${((from.valueOf() - axis.start) / span) * 100}%`,
              width: `${((to.valueOf() - from.valueOf()) / span) * 100}%`,
            }}
          />
        </span>
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] font-semibold tracking-tight">
            {exp.company}
          </span>
          <span className="max-w-[48ch] text-lg leading-snug font-medium text-pretty">{exp.position}</span>
          <span className="text-foschia text-base">{exp.location}</span>
        </span>
        <span className="flex items-start justify-end gap-2 pt-1.5 text-base lg:pt-2.5">
          <span className="hidden sm:inline">{t('more')}</span>
          <Plus
            aria-hidden="true"
            className="size-5 transition-transform duration-200 group-hover/entry:rotate-90 group-data-popup-open/entry:rotate-45"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="gap-3 pr-10">
          <DialogDescription className="tabular-nums">{periodLabel}</DialogDescription>
          <DialogTitle>{exp.company}</DialogTitle>
          <p className="text-inchiostro/80 text-[0.9375rem]">
            {exp.position}, {exp.location}
          </p>
        </DialogHeader>
        <ul className="divide-inchiostro/20 divide-y">
          {exp.achievements?.map((achievement) => (
            <li
              className="py-5 first:pt-0 last:pb-0"
              key={achievement.id ?? `${achievement.label}-${achievement.description}`}
            >
              <p className="font-display text-xl leading-snug font-semibold">{achievement.label}</p>
              <div className="prose-specimen mt-2 max-w-[65ch] leading-[1.6] [&_a]:underline">
                <Markdown>{achievement.description}</Markdown>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceEntry;
