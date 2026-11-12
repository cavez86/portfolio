'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

/** Docs-style "#" anchor: follows the link and copies its full URL. */
export const Permalink = ({ id, title }: { id: string; title: string }) => {
  const t = useTranslations('Permalink');

  const copy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url).then(
      () => toast(t('copied'), { description: url }),
      () => undefined
    );
  };

  return (
    <a
      aria-label={t('label', { title })}
      className="permalink font-mono font-normal text-faint no-underline hover:text-primary focus-visible:text-primary"
      href={`#${id}`}
      onClick={copy}
    >
      #
    </a>
  );
};
