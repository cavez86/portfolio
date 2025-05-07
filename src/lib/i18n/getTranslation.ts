import { unstable_getRscParams as getParams } from 'waku/router/server';

import i18next from './index';

export function getTranslation(ns?: string) {
  const { locale } = getParams() as { locale: string };
  const lng = locale ?? i18next.resolvedLanguage;
  return {
    t: i18next.getFixedT(lng, null, ns),
    i18n: i18next,
  };
}
