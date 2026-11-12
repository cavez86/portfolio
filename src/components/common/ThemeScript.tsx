'use client';

import { themeScript } from '@/components/common/theme';

// Runs during HTML parsing, before paint. On the client the tag becomes inert text, so React neither runs it again nor
// warns about rendering a script (see the Next.js guide on preventing flash before hydration).
export const ThemeScript = () => (
  <script
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static script that applies the theme before paint
    dangerouslySetInnerHTML={{ __html: themeScript }}
    suppressHydrationWarning
    type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
  />
);
