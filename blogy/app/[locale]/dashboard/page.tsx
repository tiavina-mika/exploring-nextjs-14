import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';

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
