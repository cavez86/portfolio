import { hasLocale } from 'next-intl';
import { getRequestConfig, RequestConfig } from 'next-intl/server';
import * as rootParams from 'next/root-params';

import { routing } from './routing';

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    locale = hasLocale(routing.locales, paramValue) ? paramValue : routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    getMessageFallback: ({ key }) => key,
    onError: (error) => {
      if (error.code === 'MISSING_MESSAGE') {
        return;
      }
      console.error(error);
    },
  };
});
