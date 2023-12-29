import { primaryFont } from '@/app/ui/fonts';
import { ReactNode } from 'react';
import '@/app/ui/global.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'; // or `v14-appRouter` if you are using Next.js v14
import ThemeRegistry from '@/components/ThemeRegistry';

type Props = {
  children: ReactNode
}
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${primaryFont} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export default RootLayout
