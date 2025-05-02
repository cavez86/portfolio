import { defaultLocale, locales } from '@/i18n/settings';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(locales);

const getLocale = (req: NextRequest) => {
  const acceptLang = req.headers.get('accept-language') || '';
  const primary = acceptLanguage.get(acceptLang) || defaultLocale;
  return locales.includes(primary) ? primary : defaultLocale;
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))) {
    return;
  }

  const locale = getLocale(req);

  req.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
