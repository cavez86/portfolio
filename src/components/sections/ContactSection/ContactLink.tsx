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
      className="flex items-center gap-4 text-foreground transition-all hover:text-primary"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked')}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex h-10 w-10 items-center justify-center border-2 border-primary bg-primary/20">
        <Icon className="h-5 w-5 text-foreground" name={icon} />
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  );
}
