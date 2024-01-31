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
import ReactQueryProvider from '@/providers/ReactQueryProvider';

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
  const isDev = process.env.NODE_ENV === 'development';

  return (
    // {/* @issue: https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c */}
    <html lang={locale} suppressHydrationWarning={isDev}>
      <body
        className={`${primaryFont} antialiased dark:bg-neutral-900`}
        suppressHydrationWarning={isDev}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <div className="p-6">{children}</div>
            <ToasterProvider />
            <ViewportIndicator />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
