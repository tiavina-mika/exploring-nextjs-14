import env from '@/env';

import { APP_NAME, AUTHOR_USERNAME } from '@/utils/constants';

export const siteConfig = {
  name: APP_NAME,
  url: env.NEXT_PUBLIC_APP_URL,
  links: { github: 'https://github.com/tiavina-mika' },
  author: AUTHOR_USERNAME,
  senderEmail: 'tikskun@gmail.com',
  social: {
    website: 'https://tiavina-michael-ralainirina.onrender.com/',
    facebook: 'https://www.facebook.com/tiksdamnworld/',
    instagram: 'https://www.instagram.com/sanzenmysteriu/',
    github: 'https://github.com/tiavina-mika',
    linkedIn: 'https://www.linkedin.com/in/tiavina-michael-ralainirina',
    youtube: 'https://www.youtube.com/@rainivoanjo',
  },
  contact: {
    email: 'tiavinamika@gmail.com',
    phone: '+26134865749'
  }
};

export type SiteConfig = typeof siteConfig;
