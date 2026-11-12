import { cn } from '@/lib/utils';

/** Static placeholders shaped like the content they stand in for; no shimmer. */
const Bar = ({ className }: { className?: string }) => <div className={cn('rounded-sm bg-muted', className)} />;

export const HeroSkeleton = () => (
  <div aria-hidden className="mb-14 border-b pt-14 pb-14 md:mb-20 md:pt-24 md:pb-20">
    <Bar className="h-7 w-32" />
    <Bar className="mt-5 h-[clamp(2.6rem,8vw,6rem)] w-4/5 max-w-2xl" />
    <Bar className="mt-3 h-[clamp(2.6rem,8vw,6rem)] w-3/5 max-w-xl" />
    <Bar className="mt-8 h-8 w-full max-w-lg" />
    <Bar className="mt-6 h-20 w-full max-w-2xl" />
    <Bar className="mt-9 h-11 w-44" />
  </div>
);

export const SectionSkeleton = ({ rows }: { rows: number }) => (
  <div aria-hidden>
    <Bar className="mb-8 h-9 w-48" />
    <div className="divide-y border-y">
      {Array.from({ length: rows }, (_, row) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders without identity
        <div className="space-y-3 py-6" key={row}>
          <Bar className="h-6 w-2/3 max-w-md" />
          <Bar className="h-4 w-full max-w-xl" />
        </div>
      ))}
    </div>
  </div>
);
