import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import AuthLink from '@/containers/auth/AuthLink';
import { ROUTES } from '@/config/routes';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import EmailResetPasswordFormProvider from '@/containers/auth/email/EmailResetPasswordFormProvider';
import { uncapitalize } from 'string-ts';
import Alert from '@/components/Alert';

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
type MetaDataProps = {
  params: { locale: Locale }
}

export const generateMetadata = async ({ params: { locale }}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  return {
    title: t('forgotPassword.metaTitle'),
    description: t('forgotPassword.metaDescription'),
  };
}

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
type Props = {
  params: {
    locale: Locale;
  };
};

const ForgotPasswordPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const tAuth = useTranslations('Auth');

  return (
    <div className='flex flex-col items-center'>
      <div  className='flex flex-col self-stretch space-y-2 items-center'>
        {/* titles */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <Title level="h2" className="text-2xl text-center">
            {tAuth('passwordResetRequest')}
          </Title>
        </div>

        <div className="!mb-4">
          <Alert color="success" message="Un email a été envoyé à votre adresse email." variant="outlined" canBeClosed={false} />
        </div>
        {/* form */}
        <div className="self-stretch">
          <EmailResetPasswordFormProvider />
        </div>

        {/* link to login page */}
        <div className="!mt-8">
          <AuthLink text={uncapitalize(tAuth('connection'))} url={ROUTES.login} label={tAuth('returnTo')} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
