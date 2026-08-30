import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  async rewrites() {
    return [
      {
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
        source: '/ingest/static/:path*',
      },
      {
        destination: 'https://eu.i.posthog.com/:path*',
        source: '/ingest/:path*',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withPayload(withNextIntl(nextConfig));
