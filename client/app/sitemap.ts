import { type MetadataRoute } from 'next';

import { getAllTranslatedUrls } from '@/utils/next.utils';
import { generateArticlesSitemap } from '@/server/queries/article.queries';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // TODO: add another dynamic route with db request
  const { nonDynamicUrls } = getAllTranslatedUrls();

  const routes = nonDynamicUrls.map((route) => ({
    url: route,
    // url: getTranslatedAbsoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  const articlesSiteMap = await generateArticlesSitemap();

  return [...routes, ...articlesSiteMap];
};

export default sitemap;
