import dayjs from 'dayjs';
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
import { cn } from '@/lib/utils';
import type { Experience } from '@/payload-types';

/** One stop on the tram line. The first stop is the terminus: the current job. */
const ExperienceCard = ({ exp, isTerminus }: { exp: Experience; isTerminus: boolean }) => {
  const t = useTranslations('Experience');
  const periodLabel = `${dayjs(exp.period.dateFrom).format('YYYY')} – ${exp.period.dateTo ? dayjs(exp.period.dateTo).format('YYYY') : t('present')}`;

  return (
    <li className="group/stop grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-5 md:grid-cols-[7.5rem_1.5rem_minmax(0,1fr)]">
      <p className="col-start-2 row-start-1 text-small leading-7 font-semibold text-muted-foreground tabular-nums md:col-start-1 md:text-right md:text-body">
        {periodLabel}
      </p>

      <div aria-hidden="true" className="relative col-start-1 row-span-2 row-start-1 md:col-start-2">
        <span className="absolute top-3.5 -bottom-3.5 left-1/2 w-1 -translate-x-1/2 bg-tram group-last/stop:hidden" />
        {isTerminus && <span className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-xs bg-tram" />}
        <span
          className={cn(
            'absolute top-3.5 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-tram transition-colors',
            isTerminus
              ? 'size-6 border-[6px] bg-foreground'
              : 'size-3.5 border-[3px] bg-background group-has-[button:focus-visible]/stop:bg-tram group-has-[button:hover]/stop:bg-tram'
          )}
        />
      </div>

      <div className="col-start-2 row-start-2 pb-12 group-last/stop:pb-0 md:col-start-3 md:row-span-2 md:row-start-1">
        <h3 className="text-2xl leading-7 font-bold">{exp.company}</h3>
        <p className="mt-3 max-w-[40ch] text-body text-pretty text-foreground/90">{exp.position}</p>
        {exp.location && <p className="text-small text-muted-foreground">{exp.location}</p>}
        <ul className="mt-3 flex max-w-[60ch] flex-wrap gap-x-4 gap-y-0.5 text-small text-foreground/80">
          {exp.achievements?.map((achievement) => (
            <li key={achievement.id ?? achievement.label}>{achievement.label}</li>
          ))}
        </ul>

        <Dialog>
          <DialogTrigger
            aria-label={`${t('details')}: ${exp.company}, ${periodLabel}`}
            className="mt-3 -ml-1 cursor-pointer rounded-xs px-1 py-2 text-small font-semibold text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-[#ffc062]"
          >
            {t('details')}
          </DialogTrigger>
          <DialogContent className="md:max-w-2xl">
            <DialogHeader className="pr-10">
              <DialogTitle>{exp.company}</DialogTitle>
              <DialogDescription className="text-body tabular-nums">
                {exp.position}, {periodLabel}
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-5">
              {exp.achievements?.map((achievement) => (
                <li key={achievement.id ?? `${achievement.label}-${achievement.description}`}>
                  <h4 className="font-semibold text-primary">{achievement.label}</h4>
                  <div className="mt-1 text-pretty text-foreground/90 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-[#ffc062] [&_p+p]:mt-2">
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

export default ExperienceCard;
