'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Markdown from 'react-markdown';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Experience } from '@/payload-types';

import { type JobText, LINE_HEIGHT, layoutExperience, NARROW, type Variant, WIDE } from './layout';
import { buildTimeline, type Segment, type Timeline } from './timeline';

type Job = Segment<Experience>;

const hasDetails = (job: Job) => (job.item.achievements?.length ?? 0) > 0;
/** Years labelled on the time axis: every fifth. */
const TICK_EVERY = 5;

const useJobText = () => {
  const t = useTranslations('Experience');
  return (job: Job) => {
    const { item, months } = job;
    const years = `${dayjs(item.period.dateFrom).format('YYYY')}–${item.period.dateTo ? dayjs(item.period.dateTo).format('YYYY') : t('present')}`;
    const whole = Math.floor(months / 12);
    const duration = [whole > 0 && t('years', { count: whole }), months % 12 > 0 && t('months', { count: months % 12 })]
      .filter(Boolean)
      .join(' ');
    return { duration, years };
  };
};

function Diagram({
  timeline,
  variant,
  active,
  onActive,
  onOpen,
}: {
  timeline: Timeline<Experience>;
  variant: Variant;
  active: number | null;
  onActive: (index: number | null) => void;
  onOpen: (index: number) => void;
}) {
  const t = useTranslations('Experience');
  const text = useJobText();
  const jobs = timeline.segments;
  const texts: JobText[] = jobs.map((job) => ({
    details: hasDetails(job),
    place: job.item.location ?? '',
    role: job.item.position,
  }));
  const layout = layoutExperience(timeline, texts, variant);
  const { width, axisX } = variant;
  const wide = variant === WIDE;
  const unit = (value: number) => `${(value / width) * 100}cqw`;
  const stroke = wide ? 1 : 0.8;
  const line = jobs.flatMap((job) => [
    [layout.laneX(job.employer), layout.toY(job.t0)],
    [layout.laneX(job.employer), layout.toY(job.t1)],
  ]);
  const end = line.at(-1) ?? [axisX, layout.plotTop];
  const percent = (value: number, of: number) => `${(value / of) * 100}%`;

  return (
    <div className="xp-diagram" style={{ aspectRatio: `${width} / ${layout.height}` }}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${width} ${layout.height}`}
      >
        {/* Axes: construction lines in pencil. Time up the page, the lanes along the bottom. */}
        <g fill="var(--color-pencil)" stroke="var(--color-pencil)" strokeWidth={1.5 * stroke}>
          <line x1={axisX} x2={axisX} y1={layout.plotBottom} y2={layout.plotTop - 30} />
          <path
            d={`M${axisX - 6},${layout.plotTop - 20}L${axisX},${layout.plotTop - 32}L${axisX + 6},${layout.plotTop - 20}`}
            fill="none"
          />
          <line x1={axisX} x2={width - 8} y1={layout.plotBottom} y2={layout.plotBottom} />
          <path
            d={`M${width - 18},${layout.plotBottom - 6}L${width - 6},${layout.plotBottom}L${width - 18},${layout.plotBottom + 6}`}
            fill="none"
          />
          {layout.yearTicks
            .filter(({ year }) => year % TICK_EVERY === 0)
            .map(({ y, year }) => (
              <g key={year}>
                <line x1={axisX - 6} x2={axisX} y1={y} y2={y} />
                <text
                  className="tabular-nums"
                  dominantBaseline="middle"
                  fontSize={wide ? 16 : 14}
                  stroke="none"
                  textAnchor="end"
                  x={axisX - 10}
                  y={y}
                >
                  {year}
                </text>
              </g>
            ))}
          <text fontSize={wide ? 18 : 14} stroke="none" x={axisX + 14} y={layout.plotTop - 18}>
            <tspan className="math" fill="var(--color-graphite)">
              t
            </tspan>{' '}
            / {t('t_unit')}
          </text>
          <text
            fontSize={wide ? 18 : 14}
            stroke="none"
            textAnchor="end"
            x={width - 8}
            y={layout.plotBottom + (wide ? 34 : 28)}
          >
            <tspan className="math" fill="var(--color-graphite)">
              x
            </tspan>{' '}
            / {t('lane_unit')}
          </text>
        </g>

        {/* Each job: a stretch of its employer's lane in a light tint, a little stronger while in focus. */}
        {layout.bands.map(({ segment, x, y, width: w, height: h }, i) => (
          <rect
            fill="var(--color-ink)"
            fillOpacity={active === i ? 0.22 : 0.09}
            height={h}
            key={segment.item.id}
            width={w}
            x={x}
            y={y}
          />
        ))}

        {/* The world-line: up a lane while there, across to the next lane at each change of employer. */}
        <polyline
          fill="none"
          points={line.map((p) => p.join(',')).join(' ')}
          stroke="var(--color-ink)"
          strokeLinejoin="round"
          strokeWidth={3.5 * stroke}
        />
        {/* Events: every new job, including a new role with the same employer; today is the filled point. */}
        {jobs.map((job) => (
          <circle
            cx={layout.laneX(job.employer)}
            cy={layout.toY(job.t0)}
            fill="var(--color-paper)"
            key={job.item.id}
            r={6 * stroke}
            stroke="var(--color-ink)"
            strokeWidth={3 * stroke}
          />
        ))}
        <circle cx={end[0]} cy={end[1]} fill="var(--color-ink)" r={6 * stroke} />

        {/* Leaders from labels standing in a column to their lane. */}
        {variant.label.placement === 'column' && (
          <g stroke="var(--color-pencil)" strokeWidth="1.5">
            {layout.lanes.map((lane) => (
              <line
                key={lane.employer}
                x1={lane.label.anchor.x + 4}
                x2={lane.label.x - 4}
                y1={lane.label.anchor.y}
                y2={lane.label.y + variant.label.name * 0.6}
              />
            ))}
          </g>
        )}
      </svg>

      {layout.lanes.map((lane) => {
        const company = lane.jobs[0].segment.item.company;
        return (
          <div
            className={cn('xp-label', lane.label.align === 'end' && 'text-right')}
            key={lane.employer}
            style={{
              left: percent(lane.label.x, width),
              top: percent(lane.label.y, layout.height),
              width: percent(lane.label.width, width),
            }}
          >
            <p
              className="font-bold text-ink"
              style={{ fontSize: unit(variant.label.name), lineHeight: LINE_HEIGHT.name }}
            >
              {company}
            </p>
            {lane.jobs.map(({ segment, index, showRole, showPlace }) => {
              const { years } = text(segment);
              const meta = { fontSize: unit(variant.label.meta), lineHeight: LINE_HEIGHT.meta };
              return (
                <div
                  className="xp-stint"
                  key={segment.item.id}
                  onPointerEnter={() => onActive(index)}
                  onPointerLeave={() => onActive(null)}
                >
                  {showRole && (
                    <p
                      className="text-graphite"
                      style={{ fontSize: unit(variant.label.role), lineHeight: LINE_HEIGHT.role }}
                    >
                      {segment.item.position}
                    </p>
                  )}
                  <p className="text-pencil tabular-nums" style={meta}>
                    {years}
                  </p>
                  {showPlace && (
                    <p className="text-pencil" style={meta}>
                      {segment.item.location}
                    </p>
                  )}
                  {hasDetails(segment) && (
                    <button
                      className="cursor-pointer font-semibold whitespace-nowrap text-ink underline decoration-dotted underline-offset-4 hover:decoration-solid"
                      onBlur={() => onActive(null)}
                      onClick={() => onOpen(index)}
                      onFocus={() => onActive(index)}
                      style={meta}
                      type="button"
                    >
                      {t('details', { count: segment.item.achievements?.length ?? 0 })}
                      <span className="sr-only">
                        {' '}
                        ({company}, {years})
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function ExperienceFigure({ experience, now }: { experience: Experience[]; now: string }) {
  const t = useTranslations('Experience');
  const text = useJobText();
  const timeline = buildTimeline(experience, new Date(now));
  const jobs = timeline.segments;
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const openJob = open === null ? null : jobs[open];
  const shared = { active, onActive: setActive, onOpen: setOpen, timeline };

  return (
    <>
      <div className="hidden xl:block">
        <Diagram {...shared} variant={WIDE} />
      </div>
      <div className="max-w-[30rem] xl:hidden">
        <Diagram {...shared} variant={NARROW} />
      </div>

      <Dialog onOpenChange={(next) => !next && setOpen(null)} open={openJob !== null}>
        {openJob && (
          <DialogContent className="md:max-w-2xl" closeLabel={t('close')}>
            <DialogHeader>
              <DialogTitle>{openJob.item.company}</DialogTitle>
              <DialogDescription render={<div />}>
                <p className="font-semibold text-graphite">{openJob.item.position}</p>
                <p>
                  {[openJob.item.location, text(openJob).years].filter(Boolean).join(', ')}{' '}
                  <span className="whitespace-nowrap">
                    (<i className="math">Δt</i> = {text(openJob).duration})
                  </span>
                </p>
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-4 border-t-2 border-ink pt-5">
              {openJob.item.achievements?.map((achievement) => (
                <li
                  className="grid gap-1 [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-3 [&_a:hover]:decoration-2"
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
        )}
      </Dialog>
    </>
  );
}
