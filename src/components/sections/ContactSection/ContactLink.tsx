'use client';

import posthog from 'posthog-js';

interface ContactLinkProps {
  description?: string | null;
  label: string;
  url: string;
}

export function ContactLink({ description, label, url }: ContactLinkProps) {
  const external = !url.startsWith('mailto:');
  return (
    <a
      className="group grid gap-1 px-4 py-5 sm:px-5 md:grid-cols-[9rem_minmax(0,1fr)] md:items-baseline md:gap-8 md:px-10 md:py-7"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked', { label })}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      <span className="text-base text-pencil">{label}</span>
      <span className="text-[clamp(1.125rem,5.2vw,1.75rem)] leading-tight font-bold text-ink decoration-2 underline-offset-[0.2em] [overflow-wrap:anywhere] group-hover:underline group-focus-visible:underline md:text-[2.25rem]">
        {description ?? label}
      </span>
    </a>
  );
}
