import { getRequestConfig, RequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }): Promise<RequestConfig> => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

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
