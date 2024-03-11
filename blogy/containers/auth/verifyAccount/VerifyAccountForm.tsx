'use client';

import { useTranslations } from 'next-intl';

import { useRouter } from '@/config/navigation';

import CodeVerification from '@/components/forms/inputs/CodeVerification';

const VerifyAccountForm = () => {
  const router = useRouter();

  const tForm = useTranslations('Form');
  const tAuth = useTranslations('Auth');

  const handleCodeVerification = (code: string) => {
    console.log('code', code);
  }


  return (
    <CodeVerification onComplete={handleCodeVerification} />
  );
};

export default VerifyAccountForm;
