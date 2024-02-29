// @credits
// https://github.com/whitecrownclown/merge-headers/blob/master/index.ts

import { defaultLocale, locales } from "@/config/i18n";
import { ROUTES, translatedRoutes } from "@/config/routes";

const isObject = (value: any) => {
  return value !== null && typeof value === "object";
}

export const mergeHeaders = (...sources: HeadersInit[]) => {
  const result: Record<string, string> = {};

  for (const source of sources) {
    if (!isObject(source)) {
      throw new TypeError("All arguments must be of type object");
    }

    const headers: Headers = new Headers(source);

    for (const [key, value] of Array.from(headers.entries())) {
      if (value === undefined || value === "undefined") {
        delete result[key];
      } else {
        result[key] = value;
      }
    }
  }

  return new Headers(result);
}

/**
 * get local from url
 * ex: /en/dashboard -> en
 * @param pathname 
 * @returns 
 */
export const getLocaleByPathname = (pathname: string): string => {
  let locale = pathname.split('/')[1];
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  };

  return locale;
}

/**
 * check if we are in dashboard or other protected routes
 * @param pathname 
 * @returns 
 */
type PathnameOutput = {
  isDashboard: boolean;
  protectedHomeRoute: string;
  isLogoutRoute: boolean;
  loginRoute: string;
  logoutRoute: string;
  isProtectedRoutes: boolean;
}
export const getRoutesFromMiddleware = (pathname: string): PathnameOutput => {
  const locale = getLocaleByPathname(pathname)

  // get all translated pathnames ex: { en: '/dashboard', fr: '/mon-espace-personel' }
  const dashboardRoutes = translatedRoutes[ROUTES.dashboard];
  const logoutRoutes = translatedRoutes[ROUTES.logout];
  const loginRoutes = translatedRoutes[ROUTES.login];
  const nonDashboardProtectedRoutes = [translatedRoutes[ROUTES.profile]];

  // translated dashboard pathname for current locale
  const currentTranslatedDashboardRoute = (dashboardRoutes as any)[locale];
  const currentTranslatedLogoutRoute = (logoutRoutes as any)[locale];
  const currentTranslatedLoginRoute = (loginRoutes as any)[locale];

  const isDashboard = pathname.includes(currentTranslatedDashboardRoute);
  const isLogoutRoute = pathname.includes(currentTranslatedLogoutRoute);

  const isProtectedRoutes = nonDashboardProtectedRoutes.some((route): boolean => pathname.includes((route as any)[locale]));

  return {
    isDashboard,
    isProtectedRoutes: isProtectedRoutes,
    isLogoutRoute,
    protectedHomeRoute: `/${locale}/${currentTranslatedDashboardRoute}`,
    loginRoute: `/${locale}/${currentTranslatedLoginRoute}`,
    logoutRoute: `/${locale}/${currentTranslatedLogoutRoute}`,
  };
};