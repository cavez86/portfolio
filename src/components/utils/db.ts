import config from '@payload-config';
import { Locale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { CollectionSlug, getPayload, GlobalSlug, Sort } from 'payload';

export const getLocalizedGlobal = async <TSlug extends GlobalSlug>(slug: TSlug) => {
  const locale = (await getLocale()) as Locale;
  const payload = await getPayload({ config });
  return await payload.findGlobal({ slug, locale });
};

export const getLocalizedCollection = async <TSlug extends CollectionSlug>(collection: TSlug, sort: Sort = ['-ID']) => {
  const locale = (await getLocale()) as Locale;
  const payload = await getPayload({ config });
  return payload.find({ collection, sort, locale }).then(({ docs }) => docs);
};
