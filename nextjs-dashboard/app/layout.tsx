import { primaryFont } from '@/app/ui/fonts';
import { ReactNode } from 'react';
import '@/app/ui/global.css';
import ThemeRegistry from '../components/ThemeRegistry';

type Props = {
  children: ReactNode
}
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${primaryFont} antialiased`}>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

export default RootLayout
