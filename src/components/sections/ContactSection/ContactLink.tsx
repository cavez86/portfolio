'use client';

import posthog from 'posthog-js';
import type { CSSProperties } from 'react';

interface ContactLinkProps {
  description?: string | null;
  label: string;
  url: string;
  /** CSS colour of this action's pencil. */
  ink: string;
}

export function ContactLink({ description, label, url, ink }: ContactLinkProps) {
  const external = !url.startsWith('mailto:');
  return (
    <a
      className="group grid gap-1 px-5 py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:items-baseline md:gap-8 md:px-10 md:py-9"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked', { label })}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ '--answer-ink': ink } as CSSProperties}
      target={external ? '_blank' : undefined}
    >
      <span className="text-lg font-medium text-pencil group-hover:text-graphite">{label}</span>
      <span className="answer text-[1.5rem] leading-tight font-bold break-words sm:text-[2rem] md:text-[2.75rem]">
        {description ?? label}
      </span>
    </a>
  );
}
