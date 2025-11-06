import dayjs from 'dayjs';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DayJsProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  useEffect(() => {
    import(`dayjs/locale/${locale}.js`)
      .then(() => {
        dayjs.locale(locale); // Set the locale for dayjs globally
      })
      .catch(() => {
        // Fallback to English if locale not found
        dayjs.locale('en');
      });
  }, [locale]);

  return <>{children}</>;
};

export default DayJsProvider;
