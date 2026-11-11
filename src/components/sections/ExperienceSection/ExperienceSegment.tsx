import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';
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

import type { Segment } from './timeline';

const ExperienceSegment = ({ segment, levels }: { segment: Segment<Experience>; levels: number }) => {
  const t = useTranslations('Experience');
  const { item, current, months } = segment;
  const years = `${dayjs(item.period.dateFrom).format('YYYY')}–${item.period.dateTo ? dayjs(item.period.dateTo).format('YYYY') : t('present')}`;
  const duration = [
    Math.floor(months / 12) > 0 && t('years', { count: Math.floor(months / 12) }),
    months % 12 > 0 && t('months', { count: months % 12 }),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Dialog>
      <DialogTrigger
        className="plot-segment group cursor-pointer text-left"
        data-current={current || undefined}
        style={
          { '--from': segment.from, '--level': segment.level, '--levels': levels, '--to': segment.to } as CSSProperties
        }
      >
        <span aria-hidden="true" className="plot-line">
          {current && <span className="plot-nib" />}
        </span>
        <span className="plot-label">
          <span className="highlight block w-fit text-[1.05rem] leading-tight font-bold text-ink group-hover:highlight-on group-focus-visible:highlight-on md:text-lg">
            {item.company}
          </span>
          <span className="block text-[0.95rem] leading-snug text-graphite md:hidden">{item.position}</span>
          <span className="block text-caption text-pencil">
            {years}, <span className="math whitespace-nowrap">Δt = {duration}</span>
          </span>
        </span>
        <span aria-hidden="true" className="plot-dimension" />
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl" closeLabel={t('close')}>
        <DialogHeader>
          <DialogTitle>{item.company}</DialogTitle>
          <DialogDescription render={<div />}>
            <p className="font-semibold text-graphite">{item.position}</p>
            <p>
              {[item.location, years].filter(Boolean).join(', ')}{' '}
              <span className="math whitespace-nowrap">(Δt = {duration})</span>
            </p>
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-4 border-t-2 border-ink pt-5">
          {item.achievements?.map((achievement) => (
            <li
              className="grid gap-1 [&_a]:text-ink [&_a]:underline [&_a]:decoration-red-pencil [&_a]:underline-offset-3 [&_a:hover]:bg-highlighter"
              key={achievement.id ?? achievement.label}
            >
              <h3 className="text-lg leading-snug">{achievement.label}</h3>
              <div className="max-w-[64ch] text-graphite">
                <Markdown>{achievement.description}</Markdown>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceSegment;
