import TranslationClientProvider from '@/components/TranslationClientProvider';

import EmailResetPasswordForm from './EmailResetPasswordForm';


const EmailResetPasswordFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Auth']}>
      <EmailResetPasswordForm />
    </TranslationClientProvider>
  );
};

export default EmailResetPasswordFormProvider;
