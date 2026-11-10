import './globals.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-start justify-center gap-4 px-5 md:px-10">
        <p className="type-display">404</p>
        <h1 className="type-heading">Page not found</h1>
        <p className="max-w-[48ch]">It might have been moved or deleted, or the address is wrong.</p>
        <a
          className="bg-inchiostro text-carta hover:bg-cobalto mt-4 inline-flex h-11 items-center rounded-full px-5 font-semibold transition-colors hover:text-white"
          href="/"
        >
          Back to home
        </a>
      </body>
    </html>
  );
}
