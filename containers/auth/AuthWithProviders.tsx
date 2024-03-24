
import { useTranslations } from 'next-intl';
import GoogleAuthButton from '@/components/buttons/GoogleAuthButton';
import Text from '@/components/typography/Text';

type Props = {
  authType: 'login' | 'signUp';
};
const AuthWithProviders = ({ authType }: Props) => {
  const tAuth = useTranslations('Auth');

  return (
    <>
      <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
        <div className="h-px w-full bg-slate-200" />
          <Text as="span" className="text-slate-400 text-sm md:text-md">
            {tAuth('or')}
          </Text>
        <div className="h-px w-full bg-slate-200" />
      </div>
      <GoogleAuthButton>
        {authType === 'login' ? tAuth('signInWithGoogle') : tAuth('signUpWithGoogle')}
      </GoogleAuthButton>
    </>
  );
};

export default AuthWithProviders;
