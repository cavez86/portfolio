'use client';

import posthog from 'posthog-js';

import Icon, { type IconName } from '@/components/common/Icon';

interface ContactLinkProps {
  cap: string;
  description?: string | null;
  icon: IconName;
  label: string;
  url: string;
}

// A push button on the machine's control panel: a coloured cap on an ink base. The cap rises under the
// pointer and sinks flush with the base when pressed, with no shadows involved.
export function ContactLink({ cap, description, icon, label, url }: ContactLinkProps) {
  return (
    <a
      className="group/press flex items-center gap-5 rounded-[2rem] md:flex-col md:items-start md:gap-6"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked')}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span aria-hidden="true" className="relative block size-24 shrink-0 md:size-44">
        <span className="bg-inchiostro absolute inset-x-0 top-2.5 bottom-0 rounded-full md:top-4" />
        <span
          className={`${cap} absolute inset-x-0 top-0 bottom-2.5 flex items-center justify-center rounded-full border-4 border-inchiostro transition-transform duration-150 group-hover/press:-translate-y-1.5 group-active/press:translate-y-2.5 md:bottom-4 md:group-active/press:translate-y-4 motion-reduce:transition-none`}
        >
          <Icon className="size-9 md:size-14" name={icon} />
        </span>
      </span>
      <span className="min-w-0">
        <span className="type-heading block">{label}</span>
        <span className="mt-1 block font-semibold wrap-anywhere md:text-lg">{description}</span>
      </span>
    </a>
  );
}
