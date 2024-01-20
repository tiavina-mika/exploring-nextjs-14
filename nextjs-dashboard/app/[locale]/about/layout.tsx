import { ReactNode } from 'react';

import '@/app/ui/global.css';

import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale, locales } from '@/config/i18n';

export const generateStaticParams = () => {
  return locales.map((locale: Locale) => ({ locale }));
};

type Props = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};
const RootLayout = ({ children, params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <div>{children}</div>;
};

export default RootLayout;
