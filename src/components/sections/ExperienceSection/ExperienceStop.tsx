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
import { cn } from '@/lib/utils';
import type { Experience } from '@/payload-types';

/** The terminus is the current job (top of the line), the origin the first job (bottom). */
export type StopKind = 'terminus' | 'stop' | 'origin';
/** Position inside a zone of consecutive stops at the same employer. */
export type ZonePart = 'first' | 'middle' | 'last';

const ZONE: Record<ZonePart, string> = {
  first: 'top-[calc(var(--marker)-var(--rail-w)*2.6)] bottom-0 rounded-t-full border-b-0',
  last: 'top-0 h-[calc(var(--marker)+var(--rail-w)*2.6)] rounded-b-full border-t-0',
  middle: 'inset-y-0 border-y-0',
};

/** One stop on the tram line. Completed stops get a stretch of line proportional to how long the job lasted. */
const ExperienceStop = ({ exp, kind, zone }: { exp: Experience; kind: StopKind; zone?: ZonePart }) => {
  const t = useTranslations('Experience');
  const { dateFrom, dateTo } = exp.period;
  const periodLabel = `${dayjs(dateFrom).format('YYYY')} – ${dateTo ? dayjs(dateTo).format('YYYY') : t('present')}`;
  const years = dateTo ? Math.max(dayjs(dateTo).diff(dateFrom, 'month') / 12, 1) : undefined;

  return (
    <li
      className={cn(
        'line-row content-start pb-16 [--marker:calc(var(--text-stop)*0.55)] md:pb-20',
        years && 'min-h-[calc(var(--years)*2.5rem)] md:min-h-[calc(var(--years)*3.75rem)]'
      )}
      style={years ? ({ '--years': years.toFixed(1) } as CSSProperties) : undefined}
    >
      <span aria-hidden="true">
        {kind === 'terminus' ? (
          <>
            <span className="rail rail-planned top-0 h-(--marker)" />
            <span className="rail top-(--marker) bottom-0" />
          </>
        ) : (
          <span className="rail inset-y-0" />
        )}
        {zone && (
          <span
            className={cn(
              'absolute left-(--rail-x) w-[calc(var(--rail-w)*4.2)] -translate-x-1/2 border-[3px] border-carta',
              ZONE[zone]
            )}
          />
        )}
        {kind !== 'stop' && (
          <span
            className={cn(
              'absolute left-(--rail-x) h-(--rail-w) w-[calc(var(--rail-w)*5)] -translate-x-1/2 bg-tram',
              kind === 'terminus' ? 'top-(--marker) -translate-y-1/2' : 'bottom-0'
            )}
          />
        )}
        <span
          className="absolute top-(--marker) left-(--rail-x) size-[calc(var(--rail-w)*2.6)] -translate-1/2 rounded-full border-[calc(var(--rail-w)*0.6)] border-tram bg-carta"
          data-stop-marker
        />
      </span>

      <h3 className="col-start-2 pr-5 font-display text-stop font-extrabold text-balance md:col-start-3 md:pr-8">
        {exp.company}
      </h3>
      <p className="col-start-2 mt-2 text-small font-semibold text-muted-foreground tabular-nums md:col-start-1 md:row-start-1 md:mt-0 md:pr-10 md:text-right md:text-lead md:leading-(--text-stop)">
        {periodLabel}
      </p>

      <div className="col-start-2 pr-5 md:col-start-3 md:pr-8">
        <p className="mt-3 max-w-[48ch] text-lead text-pretty">{exp.position}</p>
        {exp.location && <p className="text-small text-muted-foreground">{exp.location}</p>}
        <ul className="mt-4 flex max-w-[62ch] flex-wrap gap-x-5 gap-y-1 text-carta/85">
          {exp.achievements?.map((achievement) => (
            <li key={achievement.id ?? achievement.label}>{achievement.label}</li>
          ))}
        </ul>

        <Dialog>
          <DialogTrigger
            aria-label={`${t('details')}: ${exp.company}, ${periodLabel}`}
            className="mt-3 -ml-1 cursor-pointer rounded-xs px-1 py-2 text-small font-semibold text-lampione underline decoration-2 underline-offset-4 transition-colors hover:text-carta"
          >
            {t('details')}
          </DialogTrigger>
          <DialogContent className="md:max-w-2xl">
            <DialogHeader className="pr-10">
              <DialogTitle className="flex items-center gap-3 font-display text-stop font-extrabold">
                <span aria-hidden="true" className="size-5 shrink-0 rounded-full border-[5px] border-tram bg-carta" />
                {exp.company}
              </DialogTitle>
              <DialogDescription className="text-body tabular-nums">
                {exp.position}, {periodLabel}
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-5">
              {exp.achievements?.map((achievement) => (
                <li key={achievement.id ?? `${achievement.label}-${achievement.description}`}>
                  <h4 className="font-semibold text-lampione">{achievement.label}</h4>
                  <div className="mt-1 text-pretty text-carta/90 [&_a]:text-lampione [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-carta [&_p+p]:mt-2">
                    <Markdown>{achievement.description}</Markdown>
                  </div>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
};

export default ExperienceStop;
