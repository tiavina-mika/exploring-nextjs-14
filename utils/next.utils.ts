// @credits
// https://github.com/whitecrownclown/merge-headers/blob/master/index.ts

import { defaultLocale, locales } from "@/config/i18n";
import { ITranslatedPathnames, ROUTES, nonSEORoutes, translatedRoutes } from "@/config/routes";
import { Pathnames } from "next-intl/navigation";
import { getTranslatedAbsoluteUrl } from "./app.utils";

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
  const dashboardRoutes = translatedRoutes[ROUTES.dashboard] as ITranslatedPathnames;
  const logoutRoutes = translatedRoutes[ROUTES.logout] as ITranslatedPathnames;
  const loginRoutes = translatedRoutes[ROUTES.login] as ITranslatedPathnames;
  const nonDashboardProtectedRoutes = [translatedRoutes[ROUTES.profile]] as ITranslatedPathnames[];

  // translated dashboard pathname for current locale
  const currentTranslatedDashboardRoute = dashboardRoutes[locale] as string;
  const currentTranslatedLogoutRoute = logoutRoutes[locale] as string;
  const currentTranslatedLoginRoute = loginRoutes[locale] as string;

  const isDashboard = pathname.includes(currentTranslatedDashboardRoute);
  const isLogoutRoute = pathname.includes(currentTranslatedLogoutRoute);

  const isProtectedRoutes = nonDashboardProtectedRoutes.some((route): boolean => pathname.includes(route[locale] as string));

  return {
    isDashboard,
    isProtectedRoutes: isProtectedRoutes,
    isLogoutRoute,
    protectedHomeRoute: `/${locale}/${currentTranslatedDashboardRoute}`,
    loginRoute: `/${locale}/${currentTranslatedLoginRoute}`,
    logoutRoute: `/${locale}/${currentTranslatedLogoutRoute}`,
  };
};

/**
 * create url query string from object
 * ex: { field: 'updatedAt', order: 'asc' } -> ?field=updatedAt&order=asc
 */
type DefaultQSParams = Record<string, string | number | null>;
export const createQueryString = <T = DefaultQSParams>(values: T) => {
  const newSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(values as T as DefaultQSParams)) {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(value));
    }
  }

  return newSearchParams.toString();
}

/**
 * get all possible translated urls
 * @returns
 */
export const getAllTranslatedUrls = () => {
  const nonDynamicUrls = []
  const dynamicUrls = []
  for (const key of Object.keys(translatedRoutes)) {
    const isNonSEORoute = !!nonSEORoutes.find((route) => key.includes(route));
    const isWithDynamicParams = key.includes('[');

    // non dynamic and non SEO routes
    // 'http://localhost:9001/en/about', 'http://localhost:9001/fr/a-propos'
    if (!isWithDynamicParams && !isNonSEORoute) {
      for (const locale of Object.keys(translatedRoutes[key])) {
        const url = getTranslatedAbsoluteUrl(key, { locale });
        nonDynamicUrls.push(url);
      }
    // dynamic urls
    // ex: 'http://localhost:9001/en/article/my-article', 'http://localhost:9001/fr/article/mon-article'
    } else if (isWithDynamicParams && !isNonSEORoute) {
      for (const locale of Object.keys(translatedRoutes[key])) {
        const url = getTranslatedAbsoluteUrl(key, { locale });
        dynamicUrls.push(url);
      }
    }
  }

  return { nonDynamicUrls, dynamicUrls };
}
