import { ReactNode } from 'react';

import { primaryFont } from '@/components/fonts';
import ThemeProvider from '@/components/ThemeProvider';

import '@/app/ui/global.css';

import { unstable_setRequestLocale } from 'next-intl/server';

import NavBar from '@/components/navBar/NavBar';
import ToasterProvider from '@/components/ToasterProvider';
import { Locale, locales } from '@/config/i18n';
import ViewportIndicator from '@/components/ViewportIndicator';

export const generateStaticParams = () => {
  return locales.map((locale: Locale) => ({ locale }));
};

type Props = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};
const RootLayout = ({ children, params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${primaryFont} antialiased dark:bg-neutral-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div>{children}</div>
          <ToasterProvider />
          <ViewportIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
