'use client';
import { ReactNode } from 'react';
import { theme } from '@/utils/theme';
import { ThemeProvider } from '@emotion/react';

type Props = {
  children: ReactNode;
}
const ThemeRegistry = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
export default ThemeRegistry;