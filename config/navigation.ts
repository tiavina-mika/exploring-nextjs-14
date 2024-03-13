import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import { localePrefix, locales } from './i18n';
import { translatedRoutes } from './routes';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: translatedRoutes,
  });
