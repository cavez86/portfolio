'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { type CSSProperties, useId, useState } from 'react';
import Markdown from 'react-markdown';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Experience } from '@/payload-types';

import { type JobText, LINE_HEIGHT, layoutExperience, NARROW, type Variant, WIDE } from './layout';
import { buildTimeline, placements, type Segment, type Timeline } from './timeline';

/** One pencil per employer, in order of first appearance. */
const PENCILS = ['var(--color-green-ink)', 'var(--color-red-pencil)', 'var(--color-ink)', 'var(--color-graphite)'];
const pencil = (employer: number) => PENCILS[employer % PENCILS.length];

type Job = Segment<Experience>;

const hasDetails = (job: Job) => (job.item.achievements?.length ?? 0) > 0;
const city = (location?: string | null) => location?.split(',')[0]?.trim() ?? '';

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

/** What the job in focus was: its Δt and achievement titles, or the career summary when none is. */
function Annotation({
  job,
  summary,
  size,
}: {
  job: Job | null;
  summary: { total: string; today: string };
  /** Turns a size in drawing units into a CSS length. */
  size: (value: number) => string;
}) {
  const text = useJobText();
  if (!job) {
    return (
      <>
        <p className="font-bold text-ink" style={{ fontSize: size(34), lineHeight: 1.1 }}>
          {summary.total}
        </p>
        <p className="mt-1 text-graphite" style={{ fontSize: size(17) }}>
          {summary.today}
        </p>
      </>
    );
  }
  return (
    <>
      <p className="font-bold" style={{ color: pencil(job.employer), fontSize: size(22) }}>
        {job.item.company}, {text(job).years}
      </p>
      <p className="text-red-pencil" style={{ fontSize: size(16) }}>
        <i className="math">Δt</i> = {text(job).duration}
      </p>
      {hasDetails(job) ? (
        <ul className="mt-2 space-y-1 text-graphite" style={{ fontSize: size(16) }}>
          {job.item.achievements?.map((achievement) => (
            <li className="xp-note" key={achievement.id ?? achievement.label}>
              {achievement.label}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-graphite" style={{ fontSize: size(16) }}>
          {job.item.position}, {job.item.location}
        </p>
      )}
    </>
  );
}

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
  const texts: JobText[] = jobs.map((job) => ({
    details: hasDetails(job),
    place: job.item.location ?? '',
    role: job.item.position,
  }));
  const layout = layoutExperience(timeline, texts, variant);
  const { width, axisX } = variant;
  const wide = variant === WIDE;
  const unit = (value: number) => `${(value / width) * 100}cqw`;
  const half = variant.lanes.band / 2;
  const stroke = wide ? 1 : 0.8;
  const activeJob = active === null ? null : jobs[active];
  const current = jobs.find((job) => job.current);
  const line = jobs.flatMap((job) => [
    [layout.laneX(job.employer), layout.toY(job.t0)],
    [layout.laneX(job.employer), layout.toY(job.t1)],
  ]);
  const end = line.at(-1) ?? [axisX, layout.plotTop];
  const placed = placements(timeline);
  const percent = (value: number, of: number) => `${(value / of) * 100}%`;

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
              <line stroke={color} strokeOpacity="0.75" strokeWidth={2.4 * stroke} x1="0" x2="0" y1="0" y2="9" />
            </pattern>
          ))}
        </defs>

        {/* Axes: construction lines in graphite. Time up the page, the lanes along the bottom. */}
        <g fill="var(--color-pencil)" stroke="var(--color-graphite)" strokeWidth={2 * stroke}>
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
          {layout.lanes.map((lane) => (
            <g key={lane.employer}>
              <line x1={lane.x} x2={lane.x} y1={layout.plotBottom} y2={layout.plotBottom + 7} />
              {wide && (
                <text
                  fill={pencil(lane.employer)}
                  fontSize="16"
                  fontWeight="600"
                  stroke="none"
                  textAnchor="middle"
                  x={lane.x}
                  y={layout.plotBottom + 28}
                >
                  {lane.jobs[0].segment.item.company.split(/\s+/)[0]}
                </text>
              )}
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
            y={layout.plotBottom + (wide ? 62 : 28)}
          >
            <tspan className="math" fill="var(--color-graphite)">
              x
            </tspan>{' '}
            / {t('lane_unit')}
          </text>
        </g>

        {/* Each job: a stretch of its employer's lane, hatched in that employer's pencil. */}
        {layout.bands.map(({ segment, x, y, width: w, height: h }, i) => (
          <g key={segment.item.id}>
            <rect
              className="transition-opacity duration-150"
              fill="var(--color-highlighter)"
              height={h}
              opacity={active === i ? 0.9 : 0}
              width={w}
              x={x}
              y={y}
            />
            <rect fill={`url(#${id}-hatch-${segment.employer % PENCILS.length})`} height={h} width={w} x={x} y={y} />
          </g>
        ))}

        {/* Work done on another employer's premises: a dashed line in that employer's lane. */}
        {placed.map(({ index, employer, company }) => {
          const job = jobs[index];
          const x = layout.laneX(employer);
          return (
            <g key={`${index}-${employer}`} stroke={pencil(job.employer)} strokeWidth={2.5 * stroke}>
              <line strokeDasharray="7 7" x1={x} x2={x} y1={layout.toY(job.t0)} y2={layout.toY(job.t1)} />
              <line
                strokeDasharray="3 6"
                x1={layout.laneX(job.employer) + half}
                x2={x}
                y1={layout.toY(job.t0)}
                y2={layout.toY(job.t0)}
              />
              {wide && (
                <text
                  className="math"
                  fill={pencil(job.employer)}
                  fontSize="17"
                  stroke="none"
                  x={x + half + 10}
                  y={layout.toY(job.t0) - 10}
                >
                  {t('on_site', { company })}
                </text>
              )}
            </g>
          );
        })}

        {/* Duration of the job in focus, bracketed on the time axis. */}
        {activeJob && (
          <path
            d={`M${axisX + 14},${layout.toY(activeJob.t0)}h-6V${layout.toY(activeJob.t1)}h6`}
            fill="none"
            stroke="var(--color-red-pencil)"
            strokeWidth={3.5 * stroke}
          />
        )}

        {/* The world-line: up a lane while there, across to the next lane at each change of employer. */}
        <polyline
          fill="none"
          points={line.map((p) => p.join(',')).join(' ')}
          stroke="var(--color-ink)"
          strokeLinejoin="round"
          strokeWidth={5 * stroke}
        />
        {current && (
          <path
            className="xp-drawing"
            d={`M${layout.laneX(current.employer)},${layout.toY(current.t0)}V${end[1]}`}
            fill="none"
            pathLength={1}
            stroke="var(--color-red-pencil)"
            strokeLinecap="round"
            strokeWidth={5 * stroke}
          />
        )}
        {/* Events: every new job, including a new role with the same employer. */}
        {jobs.map((job) => (
          <circle
            cx={layout.laneX(job.employer)}
            cy={layout.toY(job.t0)}
            fill="var(--color-paper)"
            key={job.item.id}
            r={7 * stroke}
            stroke={pencil(job.employer)}
            strokeWidth={3.5 * stroke}
          />
        ))}
        {/* A move to another city, written under the step that took it. */}
        {wide &&
          layout.steps.map((step, i) => {
            const from = city(jobs[i].item.location);
            const to = city(jobs[i + 1].item.location);
            if (step.sameLane || !from || !to || from === to) return null;
            return (
              <text
                fill="var(--color-red-pencil)"
                fontSize="17"
                key={jobs[i + 1].item.id}
                textAnchor="middle"
                x={(step.from.x + step.to.x) / 2}
                y={step.from.y + 26}
              >
                {from} → {to}
              </text>
            );
          })}
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
              className="font-bold"
              style={{ color: pencil(lane.employer), fontSize: unit(variant.label.name), lineHeight: LINE_HEIGHT.name }}
            >
              {company}
            </p>
            {lane.jobs.map(({ segment, index, showRole, showPlace }) => {
              const { duration, years } = text(segment);
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
                    <span className={cn('highlight whitespace-nowrap', active === index && 'highlight-on')}>
                      {years}
                    </span>
                    {wide ? ', ' : <br />}
                    <span className="whitespace-nowrap">
                      <i className="math">Δt</i> = {duration}
                    </span>
                  </p>
                  {showPlace && (
                    <p className="text-pencil" style={meta}>
                      {segment.item.location}
                    </p>
                  )}
                  {hasDetails(segment) && (
                    <button
                      className="cursor-pointer font-semibold whitespace-nowrap text-red-pencil underline decoration-dotted underline-offset-4"
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

      {layout.panel && (
        <div
          aria-hidden="true"
          className="xp-panel"
          style={{
            left: percent(layout.panel.x, width),
            top: percent(layout.panel.y, layout.height),
            width: percent(layout.panel.width, width),
          }}
        >
          <Annotation job={activeJob} size={unit} summary={summary} />
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
    today: t('summary', { lanes: new Set(jobs.map((job) => job.employer)).size, today: todayLabel }),
    total: t('years', { count: Math.round(timeline.total * 10) / 10 }),
  };
  const shared = { active, onActive: setActive, onOpen: setOpen, summary, timeline };

  return (
    <>
      <div className="hidden xl:block">
        <Diagram {...shared} variant={WIDE} />
      </div>
      {/* Narrower pages: the drawing, and from 1024px the same annotation beside it. */}
      <div className="grid items-start gap-12 lg:grid-cols-[30rem_minmax(0,1fr)] xl:hidden">
        <div className="max-w-[30rem]">
          <Diagram {...shared} variant={NARROW} />
        </div>
        <div aria-hidden="true" className="xp-side hidden lg:block">
          <Annotation
            job={active === null ? null : jobs[active]}
            size={(value) => `${value / 16}rem`}
            summary={summary}
          />
        </div>
      </div>

      <Dialog onOpenChange={(next) => !next && setOpen(null)} open={openJob !== null}>
        {openJob && (
          <DialogContent className="md:max-w-2xl" closeLabel={t('close')}>
            <DialogHeader>
              <DialogTitle style={{ color: pencil(openJob.employer) } as CSSProperties}>
                {openJob.item.company}
              </DialogTitle>
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
