import { ButtonVariantType, ButtonPaletteColor } from '@/types/component.type';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const getClassNameByColor = (color: ButtonPaletteColor, variant: ButtonVariantType) => {
  if (variant === 'contained') {
    switch (color) {
      case 'primary': {
        return 'bg-primary text-white'
      }
      case 'secondary': {
        return 'bg-secondary text-white'
      }
      case 'success': {
        return 'bg-success text-white'
      }
      case 'error': {
        return 'bg-error text-white'
      }
      case 'info': {
        return 'bg-info text-white'
      }
      case 'warning': {
        return 'bg-warning text-white'
      }
      default: {
        return 'bg-gray-400 text-white'
      }
    }
    return;
  }

  if (variant === 'outlined') {
    switch (color) {
      case 'primary': {
        return 'border-solid border border-primary text-primary'
      }
      case 'secondary': {
        return 'border-solid border border-secondary text-secondary'
      }
      case 'success': {
        return 'border-solid border border-success text-success'
      }
      case 'error': {
        return 'border-solid border border-error text-error'
      }
      case 'info': {
        return 'border-solid border border-info text-info'
      }
      case 'warning': {
        return 'border-solid border border-warning text-warning'
      }
      default: {
        return 'border-solid border border-gray-400 text-gray-400'
      }
    }
  }
}

type Props = {
  variant?: ButtonVariantType;
  children: ReactNode;
  color?: ButtonPaletteColor;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = 'contained', children, color = "primary", className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={twMerge('rounded-md font-primary px-4 py-3', getClassNameByColor(color, variant), className)}
    >
      {children}
    </button>
  );
};

export default Button;
