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
