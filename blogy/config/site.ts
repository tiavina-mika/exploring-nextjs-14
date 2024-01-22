import { APP_NAME, AUTHOR_USERNAME } from '@/utils/constants';

export const siteConfig = {
  name: APP_NAME,
  description:
    'Blogy is a simple web application using NextJs, it serves as a boilerplate for NextJs 14 applications',
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9001'
      : 'https://table.sadmn.com',
  links: { github: 'https://github.com/tiavina-mika' },
  author: AUTHOR_USERNAME,
};

export type SiteConfig = typeof siteConfig;
