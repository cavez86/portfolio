import { resolve } from 'node:path';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

export const languages = ['en', 'it'];

i18n
  .use(resourcesToBackend((language, _namespace, _callback) => import(`../../messages/${language}.json`)))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: languages,
    debug: process.env.NODE_ENV === 'development',
    backend: {
      loadPath: resolve('./messages/{{lng}}.json'),
    },
  });

export default i18n;
