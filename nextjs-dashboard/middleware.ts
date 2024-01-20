import { locales, defaultLocale, localePrefix } from '@/config/i18n';
import createMiddleware from 'next-intl/middleware';
import { translatedPathnames } from './config/routes';
 
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
  matcher: ['/', '/(fr|en)/:path*']
};