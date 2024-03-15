import { ReactNode } from 'react';

import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import Container from '@/components/Container';

type Props = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};
const AuthLayout = async ({ children, params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <Container className="flex justify-center md:h-screen pt-0 md:pt-32">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {children}
      </div>
    </Container>
  );
};

export default AuthLayout;
