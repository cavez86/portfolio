import config from '@payload-config';
import { renderToBuffer } from '@react-pdf/renderer';
import { hasLocale, Locale } from 'next-intl';
import { CollectionSlug, getPayload, GlobalSlug, Sort } from 'payload';
import { z } from 'zod';

import { PortfolioPDF } from '@/components/pdf/PortfolioPDF';
import { routing } from '@/i18n/routing';

import { publicProcedure, router } from '../init';

// Helper functions to get data
const getLocalizedGlobal = async <TSlug extends GlobalSlug>(slug: TSlug, locale: Locale) => {
  const payload = await getPayload({ config });
  return await payload.findGlobal({ slug, locale });
};

const getLocalizedCollection = async <TSlug extends CollectionSlug>(
  collection: TSlug,
  locale: Locale,
  sort: Sort = ['-ID']
) => {
  const payload = await getPayload({ config });
  return payload.find({ collection, sort, locale }).then(({ docs }) => docs);
};

// Sanitize filename: remove/replace unsafe characters
const sanitizeFilename = (name: string): string => {
  return name
    .replace(/[^a-zA-Z0-9\s-_]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .substring(0, 50); // Limit length
};

export const pdfRouter = router({
  exportPDF: publicProcedure
    .input(
      z.object({
        locale: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const localeParam = input.locale || routing.defaultLocale;
      const locale = hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale;

      // Fetch all portfolio data in parallel
      const [personalInfo, contacts, experience, education, skills, softSkills, languages] = await Promise.all([
        getLocalizedGlobal('personal-info', locale),
        getLocalizedCollection('contacts', locale),
        getLocalizedCollection('experience', locale, ['period.dateFrom']),
        getLocalizedCollection('education', locale),
        getLocalizedCollection('skills', locale),
        getLocalizedCollection('soft-skills', locale),
        getLocalizedCollection('languages', locale),
      ]);

      // Generate PDF
      const pdfDocument = (
        <PortfolioPDF
          personalInfo={personalInfo}
          contacts={contacts}
          experience={experience}
          education={education}
          skills={skills}
          softSkills={softSkills}
          languages={languages}
        />
      );

      // Render PDF to buffer
      const pdfBuffer = await renderToBuffer(pdfDocument);

      const safeFilename = sanitizeFilename(personalInfo.name) || 'portfolio';

      // Return PDF data as base64 string along with filename
      return {
        pdfData: Buffer.from(pdfBuffer).toString('base64'),
        filename: `${safeFilename}_CV.pdf`,
      };
    }),
});

export type PdfRouter = typeof pdfRouter;
