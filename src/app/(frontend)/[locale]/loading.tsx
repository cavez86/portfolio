import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Loading');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" role="status">
      <div className="h-1 w-40 overflow-hidden rounded-xs bg-border">
        <div className="shuttle h-full w-10 rounded-xs bg-tram" />
      </div>
      <p className="text-muted-foreground">{t('loading')}</p>
    </div>
  );
}
