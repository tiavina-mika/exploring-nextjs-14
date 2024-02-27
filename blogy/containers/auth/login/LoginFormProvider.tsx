import TranslationClientProvider from '@/components/TranslationClientProvider';

import LoginForm from './LoginForm';


const LoginFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Auth']}>
      <LoginForm />
    </TranslationClientProvider>
  );
};

export default LoginFormProvider;
