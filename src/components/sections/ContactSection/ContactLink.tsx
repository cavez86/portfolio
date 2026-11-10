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
      className="group/contact flex items-center gap-5 py-5 transition-colors hover:text-primary"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked')}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon aria-hidden="true" className="size-7 shrink-0 text-primary" name={icon} />
      <span className="min-w-0">
        <span className="block text-small text-muted-foreground">{label}</span>
        <span className="block text-[clamp(1.125rem,0.6rem+2.4vw,1.75rem)] leading-tight font-semibold [overflow-wrap:anywhere] underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover/contact:decoration-primary">
          {description}
        </span>
      </span>
    </a>
  );
}
