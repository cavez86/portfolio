import config from '@payload-config';
import { renderToBuffer } from '@react-pdf/renderer';
import { hasLocale, Locale } from 'next-intl';
import { NextRequest } from 'next/server';
import { CollectionSlug, getPayload, GlobalSlug, Sort } from 'payload';

import { PortfolioPDF } from '@/components/pdf/PortfolioPDF';
import { routing } from '@/i18n/routing';

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

export async function GET(request: NextRequest) {
  try {
    // Get locale from query params or use default
    const searchParams = request.nextUrl.searchParams;
    const localeParam = searchParams.get('locale') || routing.defaultLocale;
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

    // Return PDF with appropriate headers
    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${personalInfo.name.replace(/\s+/g, '_')}_CV.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
