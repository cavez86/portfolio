import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
  server: {
    DATABASE_URL: z.string().url().optional(),
    PAYLOAD_SECRET: z.string().min(1).optional(),
    PORT: z.coerce.number().int().positive().optional(),
    POSTGRES_URL: z.string().url().optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    VERCEL_URL: z.string().min(1).optional(),
  },
});
