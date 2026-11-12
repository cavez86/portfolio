'use client';

import { useLocale } from 'next-intl';
import { useSyncExternalStore } from 'react';

import { formatDuration, monthsCovered } from '@/components/utils/releases';

let now: Date | undefined;
const subscribe = () => () => undefined;
const getNow = () => {
  now ??= new Date();
  return now;
};
const getServerNow = () => null;

/** "(5 years, 4 months)". Open-ended periods are measured on the client, so the static shell never goes stale. */
export const Duration = ({ from, to }: { from: string; to?: string | null }) => {
  const locale = useLocale();
  const today = useSyncExternalStore(subscribe, getNow, getServerNow);
  const end = to ? new Date(to) : today;

  if (!end) return null;
  return <span className="text-faint"> ({formatDuration(monthsCovered(new Date(from), end), locale)})</span>;
};
