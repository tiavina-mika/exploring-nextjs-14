import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import Logout from '@/containers/auth/Logout';

type Props = {
  params: {
    locale: Locale;
  };
};

const LogoutPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <Logout />;
};

export default LogoutPage;
