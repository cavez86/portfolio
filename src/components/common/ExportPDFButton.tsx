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
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isLoading}
      className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
    >
      <Download className="h-4 w-4 md:mr-2" />
      <span className="hidden md:block">{isLoading ? 'Exporting...' : 'Export PDF'}</span>
    </Button>
  );
};
