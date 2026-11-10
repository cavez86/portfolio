'use client';

import posthog from 'posthog-js';

import Icon, { type IconName } from '@/components/common/Icon';

interface ContactLinkProps {
  description?: string | null;
  icon: IconName;
  label: string;
  url: string;
}

export function ContactLink({ description, icon, label, url }: ContactLinkProps) {
  return (
    <a
      className="group/link flex items-center justify-between gap-6 border-t-2 border-inchiostro py-5 transition-colors hover:bg-inchiostro hover:text-carta hover:[--focus:var(--color-girasole)] md:px-4 md:py-7"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked')}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="min-w-0">
        <span className="type-heading block">{label}</span>
        <span className="mt-1 block text-lg font-semibold break-words">{description}</span>
      </span>
      <span className="bg-inchiostro text-carta group-hover/link:bg-girasole group-hover/link:text-inchiostro flex size-14 shrink-0 items-center justify-center rounded-full transition-colors">
        <Icon className="size-6" name={icon} />
      </span>
    </a>
  );
}
