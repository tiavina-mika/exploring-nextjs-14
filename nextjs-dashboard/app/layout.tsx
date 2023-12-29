import { primaryFont } from '@/app/ui/fonts';
import { ReactNode } from 'react';
import '@/app/ui/global.css';
// import ThemeRegistry from '../components/ThemeRegistry';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'; // or `v14-appRouter` if you are using Next.js v14
// import { theme } from '@/utils/theme';
// import { ThemeProvider } from '@mui/material';
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
        {/* <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry> */}
      </body>
    </html>
  );
}

export default RootLayout
