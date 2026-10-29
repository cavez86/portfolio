import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  async rewrites() {
    if (!posthogHost) {
      return [];
    }

    const posthogAssetsHost = posthogHost.replace('.i.posthog.com', '-assets.i.posthog.com');

    return [
      {
        destination: `${posthogAssetsHost}/static/:path*`,
        source: '/ingest/static/:path*',
      },
      {
        destination: `${posthogAssetsHost}/array/:path*`,
        source: '/ingest/array/:path*',
      },
      {
        destination: `${posthogHost}/:path*`,
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
