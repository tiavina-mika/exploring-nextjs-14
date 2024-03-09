import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import { Metadata } from 'next';

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
    <main>
      <div>
        <Title>Dashboard home page</Title>
      </div>
    </main>
  );
};

export default DashboardHomePage;
