'use client';

import { useAuth } from '@payloadcms/ui';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import posthog from 'posthog-js';
import { type ReactNode, useEffect, useRef } from 'react';

export function PostHogIdentityProvider({ children }: { children?: ReactNode }) {
  const { user } = useAuth();
  const previousUserId = useRef<string | null>(null);
  const userId = user ? String(user.id) : null;

  useEffect(() => {
    if (userId) {
      if (previousUserId.current && previousUserId.current !== userId) {
        posthog.reset();
      }

      posthog.identify(userId, user?.email ? { email: user.email } : undefined);
      previousUserId.current = userId;
      return;
    }

    if (previousUserId.current) {
      posthog.reset();
      previousUserId.current = null;
    }
  }, [user?.email, userId]);

  return children;
}

export default function IntlErrorHandlingProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <NextIntlClientProvider
      getMessageFallback={({ key }) => key}
      locale={locale}
      onError={(error) => {
        if (error.code === 'MISSING_MESSAGE') {
          return;
        }
        console.error(error);
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
