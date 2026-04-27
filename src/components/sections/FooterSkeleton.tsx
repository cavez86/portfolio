const FooterSkeleton = () => (
  <footer className="border-t-2 border-primary/30 px-4 py-8 shadow-[0_-4px_15px_rgba(0,0,0,0.5)]">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="h-10 w-36 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
        <div className="h-10 w-10 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
        <div className="h-10 w-10 animate-pulse rounded-sm border border-primary/20 bg-primary/10" />
      </div>
    </div>
  </footer>
);

export default FooterSkeleton;
