import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main className="relative flex flex-col gap-10 py-4 md:gap-16 md:py-16 lg:gap-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900" />
      <div>
        <h1>Portfolio - Migrating to TanStack Start</h1>
        <p>Home page</p>
      </div>
    </main>
  );
}
