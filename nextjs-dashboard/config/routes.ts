import { Pathnames } from 'next-intl/navigation';

import { locales } from './i18n';

// the key used for routers and translated pathnames
export const ROUTES = {
  home: '/',
  about: '/about',
  articles: {
    root: '/articles',
    add: '/articles/add',
    // do not need the params when used with translatedPathnames
    preview: (articleId?: string) => ({
      pathname: '/articles/[articleId]',
      params: { articleId },
    }),
    edit: (articleId?: string) => ({
      pathname: '/articles/[articleId]/edit',
      params: { articleId },
    }),
  },
};

// and external paths, separated by locale.
export const translatedPathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  [ROUTES.home]: '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  [ROUTES.about]: {
    en: '/about',
    fr: '/a-propos',
  },
  // Dynamic params are supported via square brackets
  'articles': {
    en: '/items',
    fr: '/articles',
  },
  [ROUTES.articles.add]: {
    en: '/items/add',
    fr: '/articles/ajouter',
  },
  [ROUTES.articles.preview().pathname]: {
    en: '/items/[articleId]',
    fr: '/articles/[articleId]',
  },
  [ROUTES.articles.edit().pathname]: {
    en: '/items/[articleId]/edit',
    fr: '/articles/[articleId]/modifier',
  },
} satisfies Pathnames<typeof locales>;
