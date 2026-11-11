'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { type CSSProperties, useId, useState } from 'react';
import Markdown from 'react-markdown';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Experience } from '@/payload-types';

import { LINE_HEIGHT, layoutExperience, NARROW, type Variant, WIDE } from './layout';
import { buildTimeline, type Segment, type Timeline } from './timeline';

/** One pencil per employer, in order of first appearance. */
const PENCILS = ['var(--color-green-ink)', 'var(--color-red-pencil)', 'var(--color-ink)', 'var(--color-graphite)'];
const pencil = (employer: number) => PENCILS[employer % PENCILS.length];

/** Where hovered or focused jobs are described on wide drawings: the empty corner under the line. */
const PANEL = { height: 300, width: 330 };

type Job = Segment<Experience>;

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

const hasDetails = (job: Job) => (job.item.achievements?.length ?? 0) > 0;

function Diagram({
  timeline,
  variant,
  active,
  onActive,
  onOpen,
  summary,
}: {
  timeline: Timeline<Experience>;
  variant: Variant;
  active: number | null;
  onActive: (index: number | null) => void;
  onOpen: (index: number) => void;
  summary: { total: string; today: string };
}) {
  const t = useTranslations('Experience');
  const text = useJobText();
  const id = useId();
  const jobs = timeline.segments;
  const layout = layoutExperience(
    timeline,
    jobs.map((job) => ({ details: hasDetails(job), role: job.item.position })),
    variant
  );
  const { width, axisX } = variant;
  const wide = variant === WIDE;
  const unit = (value: number) => `${(value / width) * 100}cqw`;
  const end = layout.line.at(-1) ?? [axisX, layout.plotBottom];
  const activeJob = active === null ? null : jobs[active];
  const current = jobs.find((job) => job.current);
  const panel = { x: width - PANEL.width - 8, y: layout.plotBottom - PANEL.height };
  const stroke = wide ? 1 : 0.8;

  return (
    <div className="xp-diagram" style={{ aspectRatio: `${width} / ${layout.height}` }}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${width} ${layout.height}`}
      >
        <defs>
          {PENCILS.map((color, k) => (
            <pattern
              height="9"
              id={`${id}-hatch-${k}`}
              key={color}
              patternTransform={`rotate(${k % 2 ? -45 : 45})`}
              patternUnits="userSpaceOnUse"
              width="9"
            >
              <line stroke={color} strokeOpacity="0.7" strokeWidth={2.4 * stroke} x1="0" x2="0" y1="0" y2="9" />
            </pattern>
          ))}
        </defs>

        {/* The area under each job: time spent there, hatched in the employer's pencil. */}
        {layout.bands.map(({ points, segment }, i) => (
          <g key={segment.item.id}>
            <polygon
              className="transition-opacity duration-150"
              fill="var(--color-highlighter)"
              opacity={active === i ? 0.85 : 0}
              points={points.join(' ')}
            />
            <polygon fill={`url(#${id}-hatch-${segment.employer % PENCILS.length})`} points={points.join(' ')} />
          </g>
        ))}

        {/* Axes: construction lines in graphite. */}
        <g fill="var(--color-pencil)" stroke="var(--color-graphite)" strokeWidth={2 * stroke}>
          <line x1={axisX} x2={axisX} y1={layout.plotBottom} y2={layout.toY(timeline.span) - 34} />
          <path
            d={`M${axisX - 6},${layout.toY(timeline.span) - 24}L${axisX},${layout.toY(timeline.span) - 36}L${axisX + 6},${layout.toY(timeline.span) - 24}`}
            fill="none"
          />
          <line x1={axisX} x2={layout.toX(timeline.total) + 40} y1={layout.plotBottom} y2={layout.plotBottom} />
          <path
            d={`M${layout.toX(timeline.total) + 30},${layout.plotBottom - 6}L${layout.toX(timeline.total) + 42},${layout.plotBottom}L${layout.toX(timeline.total) + 30},${layout.plotBottom + 6}`}
            fill="none"
          />
          {layout.yearTicks.map(({ y, year }) => (
            <g key={year}>
              <line x1={axisX - 6} x2={axisX} y1={y} y2={y} />
              <text
                className="tabular-nums"
                dominantBaseline="middle"
                fontSize={wide ? 15 : 13}
                stroke="none"
                textAnchor="end"
                x={axisX - 10}
                y={y}
              >
                {wide || year % 2 === 1 ? year : ''}
              </text>
            </g>
          ))}
          {layout.tauTicks.map(({ tau, x }) => (
            <g key={tau}>
              <line x1={x} x2={x} y1={layout.plotBottom} y2={layout.plotBottom + 6} />
              <text fontSize={wide ? 15 : 13} stroke="none" textAnchor="middle" x={x} y={layout.plotBottom + 22}>
                {tau}
              </text>
            </g>
          ))}
          <text fontSize={wide ? 18 : 14} stroke="none" x={axisX} y={layout.plotBottom + (wide ? 50 : 44)}>
            <tspan className="math" fill="var(--color-graphite)">
              τ
            </tspan>{' '}
            / {t('tau_unit')}
          </text>
          <text fontSize={wide ? 18 : 14} stroke="none" x={axisX + 12} y={layout.toY(timeline.span) - 22}>
            <tspan className="math" fill="var(--color-graphite)">
              t
            </tspan>{' '}
            / {t('t_unit')}
          </text>
        </g>

        {/* Projections of each job change onto the time axis. */}
        <g stroke="var(--color-pencil)" strokeDasharray="3 5" strokeWidth={1.5 * stroke}>
          {jobs.slice(0, -1).map((job) => (
            <line
              key={job.item.id}
              x1={axisX}
              x2={layout.toX(job.tau1)}
              y1={layout.toY(job.t1)}
              y2={layout.toY(job.t1)}
            />
          ))}
        </g>

        {/* Duration of the job in focus, bracketed on the time axis. */}
        {activeJob && (
          <path
            d={`M${axisX + 16},${layout.toY(activeJob.t0)}h-8V${layout.toY(activeJob.t1)}h8`}
            fill="none"
            stroke="var(--color-red-pencil)"
            strokeWidth={3.5 * stroke}
          />
        )}

        {/* The world-line and the job changes on it. */}
        <polyline
          fill="none"
          points={layout.line.map((p) => p.join(',')).join(' ')}
          stroke="var(--color-ink)"
          strokeLinejoin="round"
          strokeWidth={5 * stroke}
        />
        {jobs.map((job) => (
          <circle
            cx={layout.toX(job.tau0)}
            cy={layout.toY(job.t0)}
            fill="var(--color-paper)"
            key={job.item.id}
            r={7 * stroke}
            stroke={pencil(job.employer)}
            strokeWidth={3.5 * stroke}
          />
        ))}

        {/* Leaders from labels lifted off their segment. */}
        <g stroke="var(--color-pencil)" strokeWidth={1.5 * stroke}>
          {layout.labels.map((label, i) =>
            Math.abs(label.top + label.height / 2 - label.anchor.y) > 8 ? (
              <line
                key={jobs[i].item.id}
                x1={label.anchor.x + 8}
                x2={label.x - 4}
                y1={label.anchor.y}
                y2={Math.min(Math.max(label.anchor.y, label.top + 12), label.top + label.height - 12)}
              />
            ) : null
          )}
        </g>

        {/* Today: the current job is still being drawn, in red pencil, up to a breathing point. */}
        {current && (
          <path
            className="xp-drawing"
            d={`M${layout.toX(current.tau0)},${layout.toY(current.t0)}L${end[0]},${end[1]}`}
            fill="none"
            pathLength={1}
            stroke="var(--color-red-pencil)"
            strokeLinecap="round"
            strokeWidth={5 * stroke}
          />
        )}
        <g transform={`translate(${end[0]} ${end[1]})`}>
          <circle
            className="xp-pen-ring"
            fill="none"
            r={11 * stroke}
            stroke="var(--color-red-pencil)"
            strokeWidth="2"
          />
          <circle fill="var(--color-red-pencil)" r={6 * stroke} />
        </g>
      </svg>

      {layout.labels.map((label, i) => {
        const job = jobs[i];
        const { duration, years } = text(job);
        const details = hasDetails(job);
        const content = (
          <>
            <span
              className="block font-bold"
              style={{ color: pencil(job.employer), fontSize: unit(variant.label.name), lineHeight: LINE_HEIGHT.name }}
            >
              <span className={cn('highlight', active === i && 'highlight-on')}>{job.item.company}</span>
            </span>
            <span
              className="block text-graphite"
              style={{ fontSize: unit(variant.label.role), lineHeight: LINE_HEIGHT.role }}
            >
              {job.item.position}
            </span>
            <span
              className="block text-pencil"
              style={{ fontSize: unit(variant.label.meta), lineHeight: LINE_HEIGHT.meta }}
            >
              <span className="whitespace-nowrap">
                {years}, <i className="math">Δt</i> = {duration}
              </span>
              {wide ? ', ' : <br />}
              {job.item.location}
            </span>
            {details && (
              <span
                className="block font-semibold text-red-pencil underline decoration-dotted underline-offset-4"
                style={{ fontSize: unit(variant.label.meta), lineHeight: LINE_HEIGHT.meta }}
              >
                {t('details', { count: job.item.achievements?.length ?? 0 })}
              </span>
            )}
          </>
        );
        const style: CSSProperties = {
          left: `${(label.x / width) * 100}%`,
          top: `${(label.top / layout.height) * 100}%`,
          width: `${(label.width / width) * 100}%`,
        };
        return details ? (
          <button
            className="xp-label cursor-pointer text-left"
            key={job.item.id}
            onBlur={() => onActive(null)}
            onClick={() => onOpen(i)}
            onFocus={() => onActive(i)}
            onPointerEnter={() => onActive(i)}
            onPointerLeave={() => onActive(null)}
            style={style}
            type="button"
          >
            {content}
          </button>
        ) : (
          <div
            className="xp-label"
            key={job.item.id}
            onPointerEnter={() => onActive(i)}
            onPointerLeave={() => onActive(null)}
            style={style}
          >
            {content}
          </div>
        );
      })}

      {wide && (
        <div
          aria-hidden="true"
          className="xp-panel"
          style={{
            left: `${(panel.x / width) * 100}%`,
            top: `${(panel.y / layout.height) * 100}%`,
            width: `${(PANEL.width / width) * 100}%`,
          }}
        >
          {activeJob ? (
            <>
              <p className="font-bold" style={{ color: pencil(activeJob.employer), fontSize: unit(22) }}>
                {activeJob.item.company}
              </p>
              <p className="text-red-pencil" style={{ fontSize: unit(16) }}>
                <i className="math">Δt</i> = {text(activeJob).duration}
              </p>
              {hasDetails(activeJob) ? (
                <ul className="mt-2 space-y-1 text-graphite" style={{ fontSize: unit(16) }}>
                  {activeJob.item.achievements?.map((achievement) => (
                    <li className="xp-note" key={achievement.id ?? achievement.label}>
                      {achievement.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-graphite" style={{ fontSize: unit(16) }}>
                  {activeJob.item.position}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="font-bold text-ink" style={{ fontSize: unit(34), lineHeight: 1.1 }}>
                <i className="math font-normal">τ</i> = {summary.total}
              </p>
              <p className="mt-1 text-graphite" style={{ fontSize: unit(17) }}>
                {summary.today}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function ExperienceFigure({
  experience,
  now,
  todayLabel,
}: {
  experience: Experience[];
  now: string;
  todayLabel: string;
}) {
  const t = useTranslations('Experience');
  const text = useJobText();
  const timeline = buildTimeline(experience, new Date(now));
  const jobs = timeline.segments;
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const openJob = open === null ? null : jobs[open];
  const summary = {
    today: t('summary', { today: todayLabel }),
    total: t('years', { count: Math.round(timeline.total * 10) / 10 }),
  };
  const shared = { active, onActive: setActive, onOpen: setOpen, summary, timeline };

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
              <DialogTitle style={{ color: pencil(openJob.employer) }}>{openJob.item.company}</DialogTitle>
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
        )}
      </Dialog>
    </>
  );
}
