import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import SignUpFormProvider from '@/containers/auth/signup/SignUpFormProvider';

type Props = {
  params: {
    locale: Locale;
  };
};

const SignUpPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Title>Create account</Title>
      </div>
      <div>
        <SignUpFormProvider />
      </div>
    </main>
  );
};

export default SignUpPage;
