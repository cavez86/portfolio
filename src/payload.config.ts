// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { en } from '@payloadcms/translations/languages/en';
import { it } from '@payloadcms/translations/languages/it';

import { Users } from '@/collections/Users';
import { PersonalInfo } from '@/collections/PersonalInfo';
import { Experience } from '@/collections/Experience';
import { Skills } from '@/collections/Skills';
import { SoftSkills } from '@/collections/SoftSkills';
import { Education } from '@/collections/Education';
import { Languages } from '@/collections/Languages';
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
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
