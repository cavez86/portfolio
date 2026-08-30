import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { en } from '@payloadcms/translations/languages/en';
import { it } from '@payloadcms/translations/languages/it';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import '@/load-env';
import { Education } from '@/collections/Education';
import { Experience } from '@/collections/Experience';
import { Languages } from '@/collections/Languages';
import { PersonalInfo } from '@/collections/PersonalInfo';
import { Skills } from '@/collections/Skills';
import { SoftSkills } from '@/collections/SoftSkills';
import { Users } from '@/collections/Users';
import { env } from '@/env';

import { Contacts } from './collections/Contacts';
import { SummaryInfo } from './collections/SummaryInfo';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Contacts, SummaryInfo, Experience, Skills, SoftSkills, Education, Languages],
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL ?? env.POSTGRES_URL,
    },
  }),
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: env.RESEND_API_KEY ?? '',
    defaultFromAddress: 'portfolio@resend.dev',
    defaultFromName: 'Payload CMS',
  }),
  globals: [PersonalInfo],
  i18n: {
    supportedLanguages: { en, it },
  },
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: ['en', 'it'],
  },
  secret: env.PAYLOAD_SECRET ?? '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
