'use client';

import posthog from 'posthog-js';

interface ContactLinkProps {
  handle: string;
  label: string;
  url: string;
}

export function ContactLink({ handle, label, url }: ContactLinkProps) {
  const external = !url.startsWith('mailto:');
  return (
    <a
      className="group flex flex-col gap-1 py-5 outline-offset-4 focus-visible:outline-on-band"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked', { label })}
      {...(external && { rel: 'noopener noreferrer', target: '_blank' })}
    >
      <span className="text-lg">{label}</span>
      <span className="font-mono text-[clamp(1.25rem,0.85rem+1.8vw,2.25rem)] leading-tight [overflow-wrap:anywhere] group-hover:underline group-hover:decoration-2">
        {handle}
      </span>
    </a>
  );
}
