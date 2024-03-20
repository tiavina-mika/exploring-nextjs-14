import { Locale, defaultLocale } from '@/config/i18n';
import enApp from '@/translations/en/app.json';
import enArticle from '@/translations/en/article.json';
import enAuth from '@/translations/en/auth.json';
import enCommon from '@/translations/en/common.json';
import enZod from '@/translations/en/zod.json';

import frApp from '@/translations/fr/app.json';
import frArticle from '@/translations/fr/article.json';
import frAuth from '@/translations/fr/auth.json';
import frCommon from '@/translations/fr/common.json';
import frZod from '@/translations/fr/zod.json';

import { getCookie } from 'cookies-next';
import { COOKIES } from './constants';

/**
 * get current local from cookies, url or default config
 * @param defaultLocal
 * @returns
 */
export const getCurrentLocale = (defaultLocal?: Locale | undefined | string) => {
  const locale = defaultLocal || getCookie(COOKIES.locale) || defaultLocale;
  return locale;
}

/**
 * load all the translations from all messages files for the given locale
 * @param locale
 * @returns
 */
export const getTranslatedMessages = (locale: string) => {
  switch (locale) {
    case 'en':
      return {
        ...enApp,
        ...enArticle,
        ...enAuth,
        ...enCommon,
        ...enZod,
      };

    // french is the default
    default:
      return {
        ...frApp,
        ...frArticle,
        ...frAuth,
        ...frCommon,
        ...frZod,
      };
  }
}
