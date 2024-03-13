import TranslationClientProvider from '@/components/TranslationClientProvider';

import SignUpForm from './SignUpForm';


const SignUpFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Auth']}>
      <SignUpForm />
    </TranslationClientProvider>
  );
};

export default SignUpFormProvider;
