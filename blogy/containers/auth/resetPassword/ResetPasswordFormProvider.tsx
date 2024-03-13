import TranslationClientProvider from '@/components/TranslationClientProvider';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Auth']}>
      <ResetPasswordForm />
    </TranslationClientProvider>
  );
};

export default ResetPasswordFormProvider;
