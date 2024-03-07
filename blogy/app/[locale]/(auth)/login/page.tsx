import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import LoginFormProvider from '@/containers/auth/login/LoginFormProvider';
import { ROUTES } from '@/config/routes';
import AuthLink from '@/containers/auth/AuthLink';
import { useTranslations } from 'next-intl';
import AuthWithProviders from '@/containers/auth/AuthWithProviders';

type Props = {
  params: {
    locale: Locale;
  };
};

const LoginPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('User');
  const tAuth = useTranslations('Auth');

  return (
    <div className='flex flex-col items-center'>
      <div  className='flex flex-col self-stretch space-y-2 items-center'>
        <Title level="h2" className="text-2xl mb-3">{tAuth('loginToYourAccount')}</Title>
        <div className="self-stretch">
          <LoginFormProvider />
        </div>
        <div>
          <AuthLink text={t('signUp')} url={ROUTES.signUp} label={t('haveNoAccountYet')} />
        </div>
      </div>

      {/* Google auth */}
      <AuthWithProviders authType="login" />
    </div>
  );
};

export default LoginPage;
