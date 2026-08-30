import posthog from 'posthog-js';

// biome-ignore lint/style/noNonNullAssertion: this value is guaranteed to be set in the environment
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: '/ingest',
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
  cookieless_mode: 'always',
  debug: process.env.NODE_ENV === 'development',
  defaults: '2025-05-24',
  ui_host: 'https://eu.posthog.com',
});
