import { type MetadataRoute } from 'next';

import { getTranslatedAbsoluteUrl } from '@/utils/app.utils';
import { ROUTES } from '@/config/routes';

const sitemap = (): MetadataRoute.Sitemap => {
  // TODO: add another dynamic route with db request 
  getTranslatedAbsoluteUrl(ROUTES.articles.root)
  const routes = ['', ROUTES.articles.root].map((route) => ({
    url: getTranslatedAbsoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
};

export default sitemap;
