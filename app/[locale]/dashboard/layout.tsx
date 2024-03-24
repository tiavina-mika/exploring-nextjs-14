import { ReactNode } from 'react';

import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale, locales } from '@/config/i18n';
import { siteConfig } from '@/config/site';
import Sidebar from '@/components/dashboard/Sidebar';
import Container from '@/components/Container';

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
type MetaDataProps = {
  params: { locale: Locale }
}

export const generateMetadata = async ({ params: { locale }}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: 'Dashboard',
      template: `%s - ${siteConfig.name}`,
      },
      description: t('home.metaDescription'),
    }
}

export const generateStaticParams = () => {
  return locales.map((locale: Locale) => ({ locale }));
};

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
type Props = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};

const DashboardLayout = async ({ children, params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-1 self-stretch">
      <Sidebar className="hidden md:block" />
      <div className="flex flex-col flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
