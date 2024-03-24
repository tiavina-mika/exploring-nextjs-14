import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

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
    title: t('dashboard.metaTitle'),
    description: t('dashboard.metaDescription'),
  };
}

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
type Props = {
  params: {
    locale: Locale;
  };
};

const DashboardHomePage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <div>
        <Breadcrumbs
          segments={[]}
          isPrivateRoute
        />
    </div>
  );
};

export default DashboardHomePage;
