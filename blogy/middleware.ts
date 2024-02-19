import { locales, defaultLocale, localePrefix } from '@/config/i18n';
import createMiddleware from 'next-intl/middleware';
import NextAuth from 'next-auth';
import { translatedPathnames } from './config/routes';
import { authConfig } from './config/auth.config';

export const authMiddleware = NextAuth(authConfig).auth;

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  localeDetection: true,
  // add prefix even with default locale
  localePrefix,
  pathnames: translatedPathnames
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(fr|en)/:path*',
      // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ],
};
