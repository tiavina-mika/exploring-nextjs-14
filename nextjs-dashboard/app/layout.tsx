import { primaryFont } from '@/components/fonts';
import { ReactNode } from 'react';
import ThemeProvider from '@/components/ThemeProvider';

import '@/app/ui/global.css';

type Props = {
  children: ReactNode
};
const RootLayout = ({ children }: Props) => (
  <html lang="en">
    <body className={`${primaryFont} antialiased dark:bg-neutral-900`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
