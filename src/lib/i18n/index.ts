import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

import { languages, fallbackLng } from './constants';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, _namespace, _callback) => import(`../../messages/${language}.json`)))
  .init({
    fallbackLng,
    supportedLngs: languages,
    debug: process.env.NODE_ENV === 'development',
    preload: runsOnServerSide ? languages : [],
  });

export default i18next;
