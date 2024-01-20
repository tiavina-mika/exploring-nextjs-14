import { Pathnames } from 'next-intl/navigation';

import { locales } from './i18n';

export const ROUTES = {
  home: '/',
  about: '/about',
  articles: {
    root: '/articles',
    add: '/articles/add',
    preview: (articleId: string) => `/articles/${articleId}`,
    edit: (articleId: string) => `/articles/${articleId}/edit`,
  },
} as const;

// and external paths, separated by locale.
export const translatedPathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  '/about': {
    en: '/about',
    fr: '/a-propos',
  },
  // Dynamic params are supported via square brackets
  '/articles': {
    en: '/items',
    fr: '/articles',
  },
  '/articles/add': {
    en: '/items/add',
    fr: '/articles/ajouter',
  },
  '/articles/[articleId]': {
    en: '/items/[articleId]',
    fr: '/articles/[articleId]',
  },
  '/articles/[articleId]/edit': {
    en: '/items/[articleId]/edit',
    fr: '/articles/[articleId]/modifier',
  },
} satisfies Pathnames<typeof locales>;
