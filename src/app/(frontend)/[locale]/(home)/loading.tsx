import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('Loading');

  return (
    <div className="sheet flex min-h-[60vh] items-center">
      <p className="flex items-center gap-4 text-lead text-pencil" role="status">
        {/* A pendulum at rest while the page is drawn. */}
        <svg aria-hidden="true" className="h-12 w-8 overflow-visible" viewBox="0 0 32 48">
          <line stroke="var(--color-ink)" strokeWidth="3" x1="2" x2="30" y1="2" y2="2" />
          <line stroke="var(--color-graphite)" strokeWidth="2" x1="16" x2="16" y1="2" y2="36" />
          <circle cx="16" cy="40" fill="var(--color-paper)" r="6" stroke="var(--color-ink)" strokeWidth="3" />
        </svg>
        {t('loading')}
      </p>
    </div>
  );
}
