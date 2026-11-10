import './globals.css';

import Link from 'next/link';

// Rendered outside the locale layout (no translations, no web fonts), so it stays small and uses the system didone stack.
export default function NotFound() {
  return (
    <div className="bg-savoia text-carta flex min-h-svh flex-col items-start justify-center gap-6 p-6 sm:p-16">
      <p
        aria-hidden="true"
        className="font-display text-[clamp(7rem,26vw,20rem)] leading-[0.8] tracking-[-0.04em] italic"
      >
        404
      </p>
      <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-medium tracking-tight">
        Page not found
      </h1>
      <Link
        className="bg-carta text-savoia hover:bg-notte hover:text-carta inline-flex h-12 items-center rounded-sm px-6 text-base font-medium transition-colors"
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
}
