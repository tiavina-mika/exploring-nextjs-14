import { ReactNode } from 'react';

import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { primaryFont } from '@/components/fonts';
import NavBar from '@/components/navBar/NavBar';
import ToasterProvider from '@/components/ToasterProvider';
import ViewportIndicator from '@/components/ViewportIndicator';
import { Locale, locales } from '@/config/i18n';
import { siteConfig } from '@/config/site';
import ThemeProvider from '@/providers/ThemeProvider';
import { auth } from '@/config/auth.config';
import NextAuthProvider from '@/providers/NextAuthProvider';
import Footer from '@/components/Footer';

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
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
        url: siteConfig.social.linkedIn,
      },
    ],
    creator: siteConfig.author,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: t('home.metaDescription'),
      siteName: siteConfig.name,
    },
    icons: {
      icon: '/favicon.ico',
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  };
}

export const generateStaticParams = () => {
  return locales.map((locale: Locale) => ({ locale }));
};

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-col items-center justify-between min-h-screen">
              <div className="self-stretch flex flex-col items-center">
                <NavBar isLoggedIn={!!session} className="self-stretch" />
                {children}
              </div>
              <Footer />
            </main>
            <ToasterProvider />
            <ViewportIndicator />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
