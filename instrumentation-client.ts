import posthog from 'posthog-js';

import { env } from '@/env';

const projectToken = env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = env.NEXT_PUBLIC_POSTHOG_HOST;

if (!projectToken || !posthogHost) {
  if (process.env.NODE_ENV === 'development') {
    const missingVariable = projectToken ? 'NEXT_PUBLIC_POSTHOG_HOST' : 'NEXT_PUBLIC_POSTHOG_KEY';
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
    );
  }
} else {
  posthog.init(projectToken, {
    api_host: '/ingest',
    capture_exceptions: true,
    cookieless_mode: 'always',
    debug: process.env.NODE_ENV === 'development',
    defaults: '2025-05-24',
  });
}
