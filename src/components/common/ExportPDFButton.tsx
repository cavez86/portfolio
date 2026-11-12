'use client';

import { Download } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import posthog from 'posthog-js';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc/client';

export const ExportPDFButton = ({ variant = 'outline' }: { variant?: 'outline' | 'link' }) => {
  const locale = useLocale();
  const t = useTranslations('Pdf');

  const { isFetching, refetch } = trpc.pdf.exportPDF.useQuery(
    { locale },
    {
      enabled: false, // Don't run on mount
      retry: false,
    }
  );

  const handleExport = async () => {
    try {
      const result = await refetch();

      if (!result.data) {
        throw new Error('Failed to generate PDF');
      }

      const bytes = Uint8Array.from(atob(result.data.pdfData), (char) => char.charCodeAt(0));
      const url = window.URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = result.data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      posthog.capture('portfolio_pdf_exported', { locale });
      toast.success(t('success', { filename: result.data.filename }));
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error(t('error'));
    }
  };

  return (
    <Button
      className={variant === 'link' ? 'h-auto px-0 text-[0.9375rem] font-normal' : undefined}
      disabled={isFetching}
      onClick={handleExport}
      size={variant === 'link' ? 'default' : 'lg'}
      variant={variant}
    >
      <Download aria-hidden />
      {isFetching ? t('exporting') : t('label')}
    </Button>
  );
};
