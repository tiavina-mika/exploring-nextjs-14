import { type MetadataRoute } from 'next';

import { getAbsoluteUrl } from '@/utils/utils';

const sitemap = (): MetadataRoute.Sitemap => {
  // TODO: add another dynamic route with db request here
  const routes = ['', '/articles'].map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
};

export default sitemap;
