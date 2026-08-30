import config from '@payload-config';
import type { Locale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { type CollectionSlug, type GlobalSlug, getPayload, type Sort } from 'payload';

export const getLocalizedGlobal = async <TSlug extends GlobalSlug>(slug: TSlug) => {
  const locale = (await getLocale()) as Locale;
  const payload = await getPayload({ config });
  return await payload.findGlobal({ locale, slug });
};

export const getLocalizedCollection = async <TSlug extends CollectionSlug>(collection: TSlug, sort: Sort = ['-ID']) => {
  const locale = (await getLocale()) as Locale;
  const payload = await getPayload({ config });
  return payload.find({ collection, locale, sort }).then(({ docs }) => docs);
};
