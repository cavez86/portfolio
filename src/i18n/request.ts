import * as rootParams from 'next/root-params';
import { hasLocale } from 'next-intl';
import { getRequestConfig, type RequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    locale = hasLocale(routing.locales, paramValue) ? paramValue : routing.defaultLocale;
  }

  return {
    getMessageFallback: ({ key }) => key,
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError: (error) => {
      if (error.code === 'MISSING_MESSAGE') {
        return;
      }
      console.error(error);
    },
  };
});
