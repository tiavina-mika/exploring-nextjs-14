import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/app.utils';

import {
  ButtonPaletteColor,
  ButtonSize,
  ButtonVariantType,
} from '@/types/component.type';

export const buttonVariants = cva('rounded-md font-primary', {
  variants: {
    variant: {
      contained: 'text-white',
      outlined: 'border-solid border',
      text: 'bg-transparent hover:bg-gray-50 dark:hover:bg-transparent dark:hover:opacity-70',
    },
    color: {
      primary: '',
      secondary: '',
      success: '',
      error: '',
      info: '',
      warning: '',
      default: '',
    },
    size: {
      sm: 'px-2 py-1',
      md: 'px-3 py-2',
      lg: 'px-4 py-2',
    },
  },
  compoundVariants: [
    {
      variant: 'contained',
      color: 'primary',
      class: 'bg-primary',
    },
    {
      variant: 'contained',
      color: 'secondary',
      class: 'bg-secondary',
    },
    {
      variant: 'contained',
      color: 'error',
      class: 'bg-error',
    },
    {
      variant: 'contained',
      color: 'success',
      class: 'bg-success',
    },
    {
      variant: 'contained',
      color: 'info',
      class: 'bg-info',
    },
    {
      variant: 'contained',
      color: 'warning',
      class: 'bg-warning',
    },
    {
      variant: 'contained',
      color: 'default',
      class: 'bg-gray-400',
    },
    // outlined
    {
      variant: 'outlined',
      color: 'primary',
      class: 'border-primary text-primary',
    },
    {
      variant: 'outlined',
      color: 'secondary',
      class: 'border-secondary text-secondary',
    },
    {
      variant: 'outlined',
      color: 'error',
      class: 'border-error text-error',
    },
    {
      variant: 'outlined',
      color: 'success',
      class: 'border-success text-success',
    },
    {
      variant: 'outlined',
      color: 'info',
      class: 'border-info text-info',
    },
    {
      variant: 'outlined',
      color: 'warning',
      class: 'border-warning text-warning',
    },
    {
      variant: 'outlined',
      color: 'default',
      class: 'border-gray-400 text-gray-400',
    },
    // text
    {
      variant: 'text',
      color: 'primary',
      class: 'text-primary',
    },
    {
      variant: 'text',
      color: 'secondary',
      class: 'text-secondary',
    },
    {
      variant: 'text',
      color: 'error',
      class: 'text-error',
    },
    {
      variant: 'text',
      color: 'success',
      class: 'text-success',
    },
    {
      variant: 'text',
      color: 'info',
      class: 'text-info',
    },
    {
      variant: 'text',
      color: 'warning',
      class: 'text-warning',
    },
    {
      variant: 'text',
      color: 'default',
      class: 'text-gray-400',
    },
  ],
});

export type ButtonProps = {
  variant?: ButtonVariantType;
  children: ReactNode;
  color?: ButtonPaletteColor;
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  variant = 'contained',
  children,
  color = 'primary',
  className,
  fullWidth = true,
  size = 'md',
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      buttonVariants({ variant, color, size }),
      className,
      fullWidth && 'w-full',
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
);

export default Button;
