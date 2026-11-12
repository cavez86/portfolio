import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// A page that only throws notFound() cannot render a static shell, so skip that validation.
export const instant = false;

// Cache Components needs the root param and the catch-all to be enumerable.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, rest: ['not-found'] }));
}

// Unknown URLs land here to get the localized not-found page with a 404 status. loading.tsx lives in
// the (home) group because a Suspense fallback would start streaming first and lock the status to 200.
export default function UnknownPage() {
  notFound();
}
