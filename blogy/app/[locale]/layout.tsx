import { ReactNode } from 'react';

import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { primaryFont } from '@/components/fonts';
import NavBar from '@/components/navBar/NavBar';
import ToasterProvider from '@/components/ToasterProvider';
import ViewportIndicator from '@/components/ViewportIndicator';
import { Locale, locales } from '@/config/i18n';
import { siteConfig } from '@/config/site';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { auth } from '@/config/auth.config';
import NextAuthProvider from '@/providers/NextAuthProvider';

type MetaDataProps = {
  params: { locale: Locale }
}

export const generateMetadata = async ({ params: { locale }}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: t('home.metaDescription'),
    keywords: ['nextjs', 'react', 'react server components', 'nodejs', 'nextjs14', 'server actions'],
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
}

export const generateStaticParams = () => {
  return locales.map((locale: Locale) => ({ locale }));
};

type Props = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};

const RootLayout = async ({ children, params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const isDev = process.env.NODE_ENV === 'development';
  const session = await auth();

  return (
    // {/* @issue: https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c */}
    <html lang={locale} suppressHydrationWarning={isDev}>
      <body
        className={`${primaryFont} antialiased dark:bg-neutral-900`}
        suppressHydrationWarning={isDev}
      >
        <NextAuthProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar isLoggedIn={!!session} />
              <div className="p-6">{children}</div>
              <ToasterProvider />
              <ViewportIndicator />
            </ThemeProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
