import { primaryFont } from '@/components/fonts';
import { ReactNode } from 'react';
import '@/app/ui/global.css';

type Props = {
  children: ReactNode
}
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${primaryFont} antialiased`}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout
