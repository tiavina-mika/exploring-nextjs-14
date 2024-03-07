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

  return (
    <>

      <div>
        <Title>{t('createAnAccount')}</Title>
      </div>
      <div>
        <SignUpFormProvider />
        <div>
          <AuthLink text={t('login')} url={ROUTES.login} label={t('alreadyHaveAccount')} />
        </div>
        {/* Google auth */}
        <AuthWithProviders authType="signup" />
      </div>
    </>
  );
};

export default SignUpPage;
