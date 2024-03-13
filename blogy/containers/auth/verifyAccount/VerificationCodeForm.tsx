'use client';

import CodeVerification from '@/components/forms/inputs/CodeVerification';

const VerificationCodeForm = () => {
  const handleCodeVerification = (code: string) => {
    console.log('code', code);
  }

  return (
    <CodeVerification onComplete={handleCodeVerification} />
  );
};

export default VerificationCodeForm;
