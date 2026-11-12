'use client';

import posthog from 'posthog-js';

import Icon, { type IconName } from '@/components/common/Icon';

interface ContactLinkProps {
  description?: string | null;
  icon?: IconName | null;
  label: string;
  url: string;
}

export function ContactLink({ description, icon, label, url }: ContactLinkProps) {
  const external = !url.startsWith('mailto:');

  return (
    <a
      className="group flex items-center justify-between gap-6 py-5 md:py-6"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked', { label })}
      {...(external && { rel: 'noopener noreferrer', target: '_blank' })}
    >
      <span className="min-w-0">
        <span className="block text-[0.9375rem] text-muted-foreground">{label}</span>
        <span className="block text-[clamp(1.25rem,4.6vw,2rem)] leading-tight font-semibold tracking-[-0.02em] break-words text-primary decoration-2 underline-offset-[0.18em] group-hover:underline">
          {description ?? url}
        </span>
      </span>
      {icon && <Icon aria-hidden className="size-6 shrink-0 text-faint group-hover:text-primary" name={icon} />}
    </a>
  );
}
