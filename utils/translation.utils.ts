import enApp from '@/translations/en/app.json';
import enArticle from '@/translations/en/article.json';
import enAuth from '@/translations/en/auth.json';
import enCommon from '@/translations/en/common.json';

import frApp from '@/translations/fr/app.json';
import frArticle from '@/translations/fr/article.json';
import frAuth from '@/translations/fr/auth.json';
import frCommon from '@/translations/fr/common.json';

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
      };

    // french is the default
    default:
      return {
        ...frApp,
        ...frArticle,
        ...frAuth,
        ...frCommon,
      };
  }
}
