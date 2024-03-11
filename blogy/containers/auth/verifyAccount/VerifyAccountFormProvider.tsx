import TranslationClientProvider from '@/components/TranslationClientProvider';

import VerifyAccountForm from './VerifyAccountForm';


const VerifyAccountFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Auth']}>
      <VerifyAccountForm />
    </TranslationClientProvider>
  );
};

export default VerifyAccountFormProvider;
