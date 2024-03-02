import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import SignUpFormProvider from '@/containers/auth/signup/SignUpFormProvider';
import AuthLink from '@/containers/auth/AuthLink';
import { ROUTES } from '@/config/routes';
import { useTranslations } from 'next-intl';

type Props = {
  params: {
    locale: Locale;
  };
};

const SignUpPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('User');

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Title>{t('createAnAccount')}</Title>
      </div>
      <div>
        <SignUpFormProvider />
        <div>
          <AuthLink text={t('login')} url={ROUTES.login} label={t('alreadyHaveAccount')} />
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
