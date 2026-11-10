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
      className="group/contact hover:bg-savoia focus-visible:bg-savoia grid grid-cols-[1fr_auto] items-baseline gap-x-8 gap-y-1 py-5 md:-mx-4 md:px-4 transition-colors duration-200 sm:grid-cols-[13rem_1fr_auto] md:py-7"
      href={url}
      onClick={() => posthog.capture('contact_link_clicked')}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="text-foschia col-span-2 text-[0.9375rem] sm:col-span-1">{label}</span>
      <span className="min-w-0 font-sans text-xl leading-[1.15] font-medium tracking-tight wrap-anywhere md:font-display md:text-[clamp(1.5rem,2.6vw,2.5rem)] underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors duration-200 group-hover/contact:decoration-current group-focus-visible/contact:decoration-current">
        {description ?? label}
      </span>
      <Icon
        className="size-5 self-center transition-transform duration-200 group-hover/contact:scale-110"
        name={icon}
      />
    </a>
  );
}
