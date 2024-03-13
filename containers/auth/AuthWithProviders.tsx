
import { useTranslations } from 'next-intl';
import GoogleAuthButton from '@/components/buttons/GoogleAuthButton';

type Props = {
  authType: 'login' | 'signUp';
};
const AuthWithProviders = ({ authType }: Props) => {
  const tAuth = useTranslations('Auth');

  return (
    <>
      <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
        <div className="h-px w-full bg-slate-200"></div>
          {tAuth('or')}
        <div className="h-px w-full bg-slate-200"></div>
      </div>
      <GoogleAuthButton>
        {authType === 'login' ? tAuth('signInWithGoogle') : tAuth('signUpWithGoogle')}
      </GoogleAuthButton>
    </>
  );
};

export default AuthWithProviders;
