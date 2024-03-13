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
        url: 'https://www.linkedin.com/in/tiavina-michael-ralainirina/',
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
      icon: '/icon.png',
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
            <NavBar isLoggedIn={!!session} />
            <main className="flex flex-col items-center justify-center">
              <div className="max-w-screen-xl w-full py-8">
                {children}
              </div>
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
