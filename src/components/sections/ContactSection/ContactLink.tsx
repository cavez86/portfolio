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
      className="group grid gap-1 px-4 py-5 transition-colors hover:bg-highlighter focus-visible:bg-highlighter md:grid-cols-[9rem_minmax(0,1fr)] md:items-baseline md:gap-6 md:px-8 md:py-7"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked', { label })}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      <span className="text-lg font-medium text-pencil group-hover:text-graphite">{label}</span>
      <span className="text-[1.375rem] leading-tight font-bold break-words text-ink underline decoration-2 decoration-red-pencil/0 underline-offset-[0.2em] transition-[text-decoration-color] group-hover:decoration-red-pencil sm:text-[1.75rem] md:text-[2.25rem]">
        {description ?? label}
      </span>
    </a>
  );
}
