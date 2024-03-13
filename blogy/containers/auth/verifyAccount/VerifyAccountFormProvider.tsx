import TranslationClientProvider from '@/components/TranslationClientProvider';

import VerificationCodeForm from './VerificationCodeForm';


const VerifyAccountFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Auth']}>
      <VerificationCodeForm />
    </TranslationClientProvider>
  );
};

export default VerifyAccountFormProvider;
