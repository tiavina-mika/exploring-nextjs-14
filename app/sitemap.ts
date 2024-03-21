import { type MetadataRoute } from 'next';

import { getAllTranslatedUrls } from '@/utils/next.utils';

const sitemap = (): MetadataRoute.Sitemap => {
  // TODO: add another dynamic route with db request
  const { nonDynamicUrls } = getAllTranslatedUrls();

  const routes = nonDynamicUrls.map((route) => ({
    url: route,
    // url: getTranslatedAbsoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
};

export default sitemap;
