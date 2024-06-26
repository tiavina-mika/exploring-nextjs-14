import { Pathnames } from 'next-intl/navigation';

import { locales } from './i18n';

export type ITranslatedPathnames = Pathnames<typeof locales>;

// the key used for routers and translated pathnames
export const ROUTES = {
  home: '/',
  about: '/about',
  login: '/login',
  signUp: '/signup',
  logout: '/logout',
  verifyAccount: '/verify-account',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  dashboard: '/dashboard',
  contact: '/contact-us',
  faq: '/faq',
  articles: {
    root: '/articles',
    // do not need the params when used with translatedPathnames
    preview: (articleId?: string) => ({
      pathname: '/articles/[articleId]',
      params: { articleId },
    }),
  },
  private: {
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
  }
};

export const nonSEORoutes = [
  ROUTES.logout,
  ROUTES.verifyAccount,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
  ROUTES.dashboard,
];

// and external paths, separated by locale.
export const translatedRoutes = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  [ROUTES.home]: {
    en: '/',
    fr: '/'
  },

  // If locales use different paths, you can
  // specify each external path per locale.
  [ROUTES.about]: {
    en: ROUTES.about,
    fr: '/a-propos',
  },
  [ROUTES.contact]: {
    en: ROUTES.contact,
    fr: '/contactez-nous',
  },

  [ROUTES.login]: {
    en: ROUTES.login,
    fr: '/connexion',
  },
  [ROUTES.signUp]: {
    en: ROUTES.signUp,
    fr: '/creation-compte',
  },
  [ROUTES.logout]: {
    en: '/logout',
    fr: '/deconnexion',
  },
  [ROUTES.verifyAccount]: {
    en: ROUTES.verifyAccount,
    fr: '/verifier-compte',
  },
  [ROUTES.forgotPassword]: {
    en: ROUTES.forgotPassword,
    fr: '/mot-de-passe-oublie',
  },
  [ROUTES.resetPassword]: {
    en: ROUTES.resetPassword,
    fr: '/reinitialiser-mot-de-passe',
  },

  [ROUTES.faq]: {
    en: ROUTES.faq,
    fr: '/faq',
  },
  [ROUTES.profile]: {
    en: ROUTES.profile,
    fr: '/profil',
  },
  [ROUTES.articles.root]: {
    en: ROUTES.articles.root,
    fr: '/articles',
  },
  [ROUTES.articles.preview().pathname]: {
    en: '/articles/[articleId]',
    fr: '/articles/[articleId]',
  },
  // Dynamic params are supported via square brackets
  [ROUTES.private.articles.root]: {
    en: ROUTES.private.articles.root,
    fr: '/mon-espace-personel/articles',
  },
  [ROUTES.private.articles.add]: {
    en: ROUTES.private.articles.add,
    fr: '/mon-espace-personel/articles/ajouter',
  },
  [ROUTES.private.articles.preview().pathname]: {
    en: '/dashboard/articles/[articleId]',
    fr: '/mon-espace-personel/articles/[articleId]',
  },
  [ROUTES.private.articles.edit().pathname]: {
    en: '/dashboard/articles/[articleId]/edit',
    fr: '/mon-espace-personel/articles/[articleId]/modifier',
  },
  [ROUTES.dashboard]: {
    en: ROUTES.dashboard,
    fr: '/mon-espace-personel',
  },
} satisfies ITranslatedPathnames;
