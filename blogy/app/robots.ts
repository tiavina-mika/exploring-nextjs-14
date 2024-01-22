import type { MetadataRoute } from 'next';

import { getAbsoluteUrl } from '@/utils/utils';

/**
 * @see https://github.com/search?q=path%3Aapp%2Frobots.ts&type=code
 * @see https://robotstxt.org/robotstxt.html
 * @see https://rotecna.com/robots.txt
 */

const robots = (): MetadataRoute.Robots => {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${getAbsoluteUrl()}/sitemap.xml`,
  };
};

export default robots;
