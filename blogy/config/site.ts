import env from '@/env';

import { APP_NAME, AUTHOR_USERNAME } from '@/utils/constants';

export const siteConfig = {
  name: APP_NAME,
  url: env.NEXT_PUBLIC_APP_URL,
  links: { github: 'https://github.com/tiavina-mika' },
  author: AUTHOR_USERNAME,
};

export type SiteConfig = typeof siteConfig;
