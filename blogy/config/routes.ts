import { Pathnames } from 'next-intl/navigation';

import { locales } from './i18n';

// the key used for routers and translated pathnames
export const ROUTES = {
  home: '/',
  about: '/about',
  articles: {
    root: '/dashboard/articles',
    add: '/dashboard/articles/add',
    // do not need the params when used with translatedPathnames
    preview: (articleId?: string) => ({
      pathname: '/dashboard/articles/[articleId]',
      params: { articleId },
    }),
    edit: (articleId?: string) => ({
      pathname: '/dashboard/articles/[articleId]/edit',
      params: { articleId },
    }),
  },
  login: '/login',
  signUp: '/signup',
  logout: '/logout',
  profile: '/profile',
  dashboard: '/dashboard',
};

// and external paths, separated by locale.
export const translatedRoutes = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  [ROUTES.home]: '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  [ROUTES.about]: {
    en: '/about',
    fr: '/a-propos',
  },
  [ROUTES.login]: {
    en: '/login',
    fr: '/connexion',
  },
  [ROUTES.signUp]: {
    en: '/signup',
    fr: '/creation-compte',
  },
  [ROUTES.logout]: {
    en: '/logout',
    fr: '/deconnexion',
  },
  [ROUTES.profile]: {
    en: '/profile',
    fr: '/profil',
  },
  // Dynamic params are supported via square brackets
  [ROUTES.articles.root]: {
    en: '/dashboard/articles',
    fr: '/mon-espace-personel/articles',
  },
  [ROUTES.articles.add]: {
    en: '/dashboard/articles/add',
    fr: '/mon-espace-personel/articles/ajouter',
  },
  [ROUTES.articles.preview().pathname]: {
    en: '/dashboard/articles/[articleId]',
    fr: '/mon-espace-personel/articles/[articleId]',
  },
  [ROUTES.articles.edit().pathname]: {
    en: '/dashboard/articles/[articleId]/edit',
    fr: '/mon-espace-personel/articles/[articleId]/modifier',
  },
  [ROUTES.dashboard]: {
    en: '/dashboard',
    fr: '/mon-espace-personel',
  },
} satisfies Pathnames<typeof locales>;
