import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import LoginFormProvider from '@/containers/auth/login/LoginFormProvider';
import { ROUTES } from '@/config/routes';
import AuthLink from '@/containers/auth/AuthLink';
import { useTranslations } from 'next-intl';

type Props = {
  params: {
    locale: Locale;
  };
};

const LoginPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('User');

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Title>{t('login')}</Title>
        <LoginFormProvider />
        <div>
          <AuthLink text={t('login')} url={ROUTES.signUp} label={t('haveNoAccountYet')} />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
