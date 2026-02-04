import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { en } from '@payloadcms/translations/languages/en';
import { it } from '@payloadcms/translations/languages/it';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Education } from '@/collections/Education';
import { Experience } from '@/collections/Experience';
import { Languages } from '@/collections/Languages';
import { PersonalInfo } from '@/collections/PersonalInfo';
import { Skills } from '@/collections/Skills';
import { SoftSkills } from '@/collections/SoftSkills';
import { Users } from '@/collections/Users';

import { Contacts } from './collections/Contacts';
import { SummaryInfo } from './collections/SummaryInfo';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: resendAdapter({
    defaultFromAddress: 'portfolio@resend.dev',
    defaultFromName: 'Payload CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  i18n: {
    supportedLanguages: { en, it },
  },
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    fallback: true,
  },
  collections: [Users, Contacts, SummaryInfo, Experience, Skills, SoftSkills, Education, Languages],
  globals: [PersonalInfo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    },
  }),
  sharp,
});
