import { Locale } from '@/i18n/routing';
import config from '@payload-config';
import { getLocale } from 'next-intl/server';
import { CollectionSlug, getPayload, GlobalSlug } from 'payload';

export const getLocalizedGlobal = async <TSlug extends GlobalSlug>(slug: TSlug) => {
  const locale = (await getLocale()) as Locale;
  const payload = await getPayload({ config });
  return await payload.findGlobal({ slug, locale });
};

export const getLocalizedCollection = async <TSlug extends CollectionSlug>(collection: TSlug) => {
  const locale = (await getLocale()) as Locale;
  const payload = await getPayload({ config });
  return await payload.find({ collection, sort: ['-ID'], locale });
};
