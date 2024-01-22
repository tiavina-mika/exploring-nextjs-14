import { ReactNode } from 'react';

import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import { primaryFont } from '@/components/fonts';
import NavBar from '@/components/navBar/NavBar';
import ThemeProvider from '@/components/ThemeProvider';
import ToasterProvider from '@/components/ToasterProvider';
import ViewportIndicator from '@/components/ViewportIndicator';
import { Locale, locales } from '@/config/i18n';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['nextjs', 'react', 'react server components', 'nodejs'],
  authors: [
    {
      name: siteConfig.author,
      url: 'https://www.linkedin.com/in/tiavina-michael-ralainirina/',
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

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
