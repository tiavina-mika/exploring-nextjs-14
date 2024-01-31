import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/app.utils';

import {
  ButtonPaletteColor,
  SimplePaletteColorOptions,
  TextSizeType,
} from '@/types/component.type';

export const textVariants = cva('font-primary', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      error: 'text-error',
      info: 'text-info',
      warning: 'text-warning',
      default: 'text-black',
    },
    size: {
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-base',
      sm: 'text-sm',
      xs: 'text-xs',
    },
    palette: {
      dark: '',
      main: '',
      light: '',
    },
  },
  compoundVariants: [
    // dark
    {
      palette: 'dark',
      color: 'primary',
      class: 'text-primary-dark',
    },
    {
      palette: 'dark',
      color: 'secondary',
      class: 'text-secondary-dark',
    },
    {
      palette: 'dark',
      color: 'error',
      class: 'text-error-dark',
    },
    {
      palette: 'dark',
      color: 'success',
      class: 'text-success-dark',
    },
    {
      palette: 'dark',
      color: 'info',
      class: 'text-info-dark',
    },
    {
      palette: 'dark',
      color: 'warning',
      class: 'text-warning-dark',
    },
    {
      palette: 'dark',
      color: 'default',
      class: 'text-black',
    },
    // light
    {
      palette: 'light',
      color: 'primary',
      class: 'text-primary-light',
    },
    {
      palette: 'light',
      color: 'secondary',
      class: 'text-secondary-light',
    },
    {
      palette: 'light',
      color: 'error',
      class: 'text-error-light',
    },
    {
      palette: 'light',
      color: 'success',
      class: 'text-success-light',
    },
    {
      palette: 'light',
      color: 'info',
      class: 'text-info-light',
    },
    {
      palette: 'light',
      color: 'warning',
      class: 'text-warning-light',
    },
    {
      palette: 'light',
      color: 'default',
      class: 'text-gray-400',
    },
    // main
    {
      palette: 'main',
      color: 'primary',
      class: 'text-primary',
    },
    {
      palette: 'main',
      color: 'secondary',
      class: 'text-secondary',
    },
    {
      palette: 'main',
      color: 'error',
      class: 'text-error',
    },
    {
      palette: 'main',
      color: 'success',
      class: 'text-success',
    },
    {
      palette: 'main',
      color: 'info',
      class: 'text-info',
    },
    {
      palette: 'main',
      color: 'warning',
      class: 'text-warning',
    },
    {
      palette: 'main',
      color: 'default',
      class: 'text-gray-600',
    },
  ],
});
// --------- types --------- //
export type TextProps = {
  size?: TextSizeType;
  children: ReactNode;
  as?: 'span' | 'p';
  color?: ButtonPaletteColor;
  className?: string;
  palette?: SimplePaletteColorOptions;
} & VariantProps<typeof textVariants>;

const Text = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement> & TextProps
>(
  (
    {
      children,
      color = 'default',
      palette = 'dark',
      className,
      size = 'md',
      as: Component = 'p',
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={cn(
        textVariants({ color, size, palette }),
        className,
        'dark:text-white',
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

export default Text;
