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
      className="group/contact hover:bg-savoia focus-visible:bg-savoia -mx-4 grid grid-cols-[1fr_auto] items-baseline gap-x-8 gap-y-1 px-4 py-6 transition-colors duration-200 sm:grid-cols-[13rem_1fr_auto] md:py-8"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked')}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="text-foschia col-span-2 text-[0.9375rem] sm:col-span-1">{label}</span>
      <span className="font-display min-w-0 text-[clamp(1.375rem,2.6vw,2.5rem)] leading-[1.15] font-medium tracking-tight wrap-anywhere underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors duration-200 group-hover/contact:decoration-current group-focus-visible/contact:decoration-current">
        {description ?? label}
      </span>
      <Icon
        className="size-5 self-center transition-transform duration-200 group-hover/contact:scale-110"
        name={icon}
      />
    </a>
  );
}
