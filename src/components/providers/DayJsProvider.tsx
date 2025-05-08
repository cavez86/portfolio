'use client';

import dayjs from 'dayjs';
import { useLocale } from 'next-intl';
import { ReactNode } from 'react';

const DayJsProvider = ({ children }: { children: ReactNode }) => {
  const locale = useLocale();

  import(`dayjs/locale/${locale}.js`).then(() => {
    dayjs.locale(locale); // Set the locale for dayjs globally
  });

  return <>{children}</>;
};

export default DayJsProvider;
