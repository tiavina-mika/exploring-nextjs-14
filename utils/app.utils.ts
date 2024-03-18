import { getCookie } from 'cookies-next';
import env from '@/env';
import { IListFilter, IPaginationQuery } from '@/types/app.type';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { COOKIES } from './constants';
import { Locale, defaultLocale } from '@/config/i18n';
import { ITranslatedPathnames, ROUTES, translatedRoutes } from '@/config/routes';
import { IMultiOptionSelect } from '@/components/forms/inputs/MultiSelect';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * get current local from cookies, url or default config
 * @param defaultLocal
 * @returns
 */
const getCurrentLocale = (defaultLocal?: Locale | undefined | string) => {
  const locale = defaultLocal || getCookie(COOKIES.locale) || defaultLocale;
  return locale;
}

export const getAbsoluteUrl = (path?: string): string => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
};

/**
 * get the current url browser
 * if no path, the home url will be returned
 * @param params ex: { locale: 'fr', articleId: '1' }
 * @param path
 * @returns
 */
export const getTranslatedAbsoluteUrl = (path = ROUTES.home, params?: Record<string, string>): string => {
  const locale = getCurrentLocale(params?.locale);
  const routes = translatedRoutes[path] as ITranslatedPathnames;
  const pathname = routes[locale] as string;

  /**
   * change the pathname params key to dynamic value
   * ex: /dashboard/articles/[articleId] -> /dashboard/articles/1
   */
  if (params) {
    let translatedPath = pathname;
    Object.keys(params).forEach((key: string) => {
      translatedPath = translatedPath.replace(`[${key}]`, params[key]);
    });

    const url = getAbsoluteUrl(`/${locale}${translatedPath}`);
    return url;
  }

  const url = getAbsoluteUrl(`/${locale}${pathname}`);
  return url;
}

export const getPaginatedQuery = ({ perPage, page, order, field }: IListFilter): IPaginationQuery => {
  return {
    limit: perPage,
    skip: (page - 1) * perPage,
    order,
    field,
  }
}

/**
 * get the label or other properties of the select option by the value
 */
export const getSelectOptionByValue = (options: IMultiOptionSelect[], value: string, key = "label") => {
  const option = options.find((option: IMultiOptionSelect) => option.value === value);
  return option ? option[key] : '';
}
