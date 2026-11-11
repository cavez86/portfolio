'use client';

import posthog from 'posthog-js';

interface ContactLinkProps {
  description?: string | null;
  label: string;
  url: string;
}

export function ContactLink({ description, label, url }: ContactLinkProps) {
  return (
    <a
      className="group/contact block border-t-[3px] border-lampione pt-3"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked')}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="block text-small font-semibold text-muted-foreground">{label}</span>
      <span className="mt-1 block font-display text-[clamp(1.625rem,1.2rem+1.1vw,2.125rem)] leading-tight font-bold [overflow-wrap:anywhere] text-carta underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover/contact:text-lampione group-hover/contact:decoration-lampione">
        {description}
      </span>
    </a>
  );
}
