import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import Container from '@/components/Container';

type Props = {
  params: {
    locale: Locale;
  };
};

const AboutPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('NavBar');

  return <Container>{t('about')} page</Container>;
};

export default AboutPage;
