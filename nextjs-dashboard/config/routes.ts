import { Pathnames } from 'next-intl/navigation';

import { locales } from './i18n';

// the key used for routers and translated pathnames
const routeKeys = {
  home: '/',
  about: '/about',
  articles: {
    root: '/articles',
    add: '/articles/add',
    preview: '/articles/[articleId]',
    edit: '/articles/[articleId]/edit',
  },
};

export const ROUTES = {
  [routeKeys.home]: '/',
  [routeKeys.about]: '/about',
  // article routes are nested
  [routeKeys.articles.root]: {
    [routeKeys.articles.root]: '/articles',
    [routeKeys.articles.add]: '/articles/add',
    [routeKeys.articles.preview]: (articleId: string) =>
      `/articles/${articleId}`,
    [routeKeys.articles.edit]: (articleId: string) =>
      `/articles/${articleId}/edit`,
  },
} as const;

// and external paths, separated by locale.
export const translatedPathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  [routeKeys.home]: '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  [routeKeys.about]: {
    en: '/about',
    fr: '/a-propos',
  },
  // Dynamic params are supported via square brackets
  'articles': {
    en: '/items',
    fr: '/articles',
  },
  [routeKeys.articles.add]: {
    en: '/items/add',
    fr: '/articles/ajouter',
  },
  [routeKeys.articles.preview]: {
    en: '/items/[articleId]',
    fr: '/articles/[articleId]',
  },
  [routeKeys.articles.edit]: {
    en: '/items/[articleId]/edit',
    fr: '/articles/[articleId]/modifier',
  },
} satisfies Pathnames<typeof locales>;
