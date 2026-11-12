import { getTranslations } from 'next-intl/server';

import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import { getLocalizedGlobal } from '@/components/utils/db';

const Footer = async () => {
  'use cache';
  const [t, personalInfo] = await Promise.all([getTranslations('Footer'), getLocalizedGlobal('personal-info')]);

  return (
    <footer className="mt-auto border-t bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-semibold">{personalInfo.name}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <ExportPDFButton variant="link" />
          <a
            className="rounded-sm text-[0.9375rem] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            href="#top"
          >
            {t('back_to_top')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
