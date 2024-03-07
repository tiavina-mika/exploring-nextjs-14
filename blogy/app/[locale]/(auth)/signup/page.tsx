import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import SignUpFormProvider from '@/containers/auth/signup/SignUpFormProvider';
import AuthLink from '@/containers/auth/AuthLink';
import { ROUTES } from '@/config/routes';
import { useTranslations } from 'next-intl';
import AuthWithProviders from '@/containers/auth/AuthWithProviders';

type Props = {
  params: {
    locale: Locale;
  };
};

const SignUpPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('User');
  const tAuth = useTranslations('Auth');

  return (
    <div className='flex flex-col items-center'>
      <div  className='flex flex-col self-stretch space-y-2 items-center'>
        <Title level="h2" className="text-2xl mb-3">{tAuth('createAnAccount')}</Title>
        <div className="self-stretch">
          <SignUpFormProvider />
        </div>
        <div>
          <AuthLink text={t('login')} url={ROUTES.login} label={t('alreadyHaveAccount')} />
        </div>
      </div>

      {/* Google auth */}
      <AuthWithProviders authType="signUp" />
    </div>
  );
};

export default SignUpPage;
