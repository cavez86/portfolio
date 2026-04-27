const HeaderSkeleton = () => (
  <header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky -top-16.5 z-50 border-b-2 border-primary/30 px-6 py-4 backdrop-blur md:top-0 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
    <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
      <div className="hidden items-center gap-8 md:flex">
        <div className="h-5 w-24 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
        <div className="h-5 w-16 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
        <div className="h-5 w-20 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="h-9 w-9 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
        <div className="h-9 w-9 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
        <div className="h-9 w-9 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
      </div>
    </div>
  </header>
);

export default HeaderSkeleton;
