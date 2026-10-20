import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchLogRecordProcessor, LoggerProvider } from '@opentelemetry/sdk-logs';

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!projectToken || !posthogHost) {
  if (process.env.NODE_ENV === 'development') {
    const missingVariable = projectToken ? 'NEXT_PUBLIC_POSTHOG_HOST' : 'NEXT_PUBLIC_POSTHOG_KEY';
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
    );
  }
}

export const posthogLogProvider =
  projectToken && posthogHost
    ? new LoggerProvider({
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              headers: {
                Authorization: `Bearer ${projectToken}`,
                'Content-Type': 'application/json',
              },
              url: `${posthogHost}/i/v1/logs`,
            }),
          }),
        ],
        resource: resourceFromAttributes({ 'service.name': 'portfolio' }),
      })
    : null;

export const posthogLogger = posthogLogProvider?.getLogger('portfolio.posthog-export');

export function register() {}
