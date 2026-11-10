import './globals.css';

/** Fallback for URLs outside any locale: the locale-aware page lives in (frontend)/[locale]. */
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col items-start justify-center px-5 py-16 md:px-8">
          <p className="border-2 border-primary px-5 py-2 text-5xl font-extrabold text-primary tabular-nums">404</p>
          <h1 className="mt-8 text-district font-bold text-balance">Page not found</h1>
          <p className="mt-3 max-w-prose text-lead text-foreground/90">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <a
            className="mt-10 inline-flex h-12 items-center rounded-sm bg-primary px-6 text-body font-semibold text-primary-foreground hover:bg-[#ffc062]"
            href="/"
          >
            Back home
          </a>
        </main>
      </body>
    </html>
  );
}
