'use client';

import { Download } from 'lucide-react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc/client';

export const ExportPDFButton = () => {
  const locale = useLocale();

  const { isLoading, refetch } = trpc.pdf.exportPDF.useQuery(
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

      // Convert base64 to blob
      const pdfData = result.data.pdfData;
      const byteCharacters = atob(pdfData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = result.data.filename;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success toast
      toast.success('PDF exported successfully', {
        description: `${result.data.filename} has been downloaded.`,
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF', {
        description: 'Please try again or contact support if the problem persists.',
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={handleExport}
      disabled={isLoading}
      className="rounded text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 md:text-sm"
    >
      <Download className="h-5 w-5" />
      <span>{isLoading ? 'Exporting...' : 'Export PDF'}</span>
    </Button>
  );
};
