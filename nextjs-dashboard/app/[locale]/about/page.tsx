import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';

type Props = {
  params: {
    locale: Locale;
  };
};

const AboutPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <div>About page</div>;
};

export default AboutPage;
