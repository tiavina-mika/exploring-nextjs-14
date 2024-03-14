import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import Title from '@/components/typography/Title';

type Props = {
  params: {
    locale: Locale;
  };
};

const HomePage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col p-6">
      <Title>Home</Title>
    </div>
  );
};

export default HomePage;
