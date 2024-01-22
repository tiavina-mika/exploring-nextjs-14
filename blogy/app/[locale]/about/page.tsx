import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';

type Props = {
  params: {
    locale: Locale;
  };
};

const AboutPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('NavBar');

  return <div>{t('about')} page</div>;
};

export default AboutPage;
