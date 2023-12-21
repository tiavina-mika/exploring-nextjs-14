import { primaryFont } from '@/app/ui/fonts';
import { ReactNode } from 'react';

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
