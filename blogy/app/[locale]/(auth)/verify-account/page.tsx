import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import AuthLink from '@/containers/auth/AuthLink';
import { ROUTES } from '@/config/routes';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import VerifyAccountFormProvider from '@/containers/auth/verifyAccount/VerifyAccountFormProvider';
import Text from '@/components/typography/Text';
import Button from '@/components/buttons/Button';

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
    title: t('verifyAccount.metaTitle'),
    description: t('verifyAccount.metaDescription'),
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

const VerifyAccountPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('User');
  const tAuth = useTranslations('Auth');

  return (
    <div className='flex flex-col items-center'>
      <div  className='flex flex-col self-stretch space-y-2 items-center'>
        {/* titles */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <Title level="h2" className="text-2xl">
            {tAuth('emailVerification')}
          </Title>
          <Text>
            {tAuth('enterCodeReceivedByEmail')}
          </Text>
        </div>

        {/* form */}
        <div className="self-stretch flex justify-center">
          <VerifyAccountFormProvider />
        </div>

        {/* resend button */}
        <div className="flex justify-center text-center mt-4">
          <Button variant="text" className="flex items-center cursor-pointer">
            <span className="font-bold">Resend code</span>
          </Button>
        </div>

        {/* link to login page */}
        <div className="mt-8">
          <AuthLink text={t('login')} url={ROUTES.login} label={tAuth('isAccountVerified')} />
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
