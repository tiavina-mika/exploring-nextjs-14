import { Inter, Roboto_Mono  } from 'next/font/google';
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const primaryFont = inter.className;
export const secondaryFont = roboto_mono.className;

export const primaryFontStyle = inter.style;
export const secondaryFontStyle = roboto_mono.style;
