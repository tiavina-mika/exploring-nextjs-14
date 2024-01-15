import { ButtonPaletteColor, SimplePaletteColorOptions, TextSizeType } from '@/types/component.type';
import { ReactNode, createElement } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';

export const textVariants = cva(
  'font-primary',
  {
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
  },
);
// --------- types --------- //
type TextProps = {
  size?: TextSizeType;
  children: ReactNode;
  component?: 'span' | 'p';
  color?: ButtonPaletteColor;
  className?: string;
  palette?: SimplePaletteColorOptions;
} & VariantProps<typeof textVariants>;

type ElementProps = Pick<TextProps, 'component' | 'children' | 'className'>;

// --------- components --------- //
const TextElement = ({ component, children, ...props }: ElementProps) => {
  if (!component) return null;
  return createElement(component, props, children);
};

const Text = ({
  children, color = 'default', palette = 'dark', className, size = 'md', component = 'p', ...props
}: TextProps) => (
  <TextElement
    className={cn(textVariants({ color, size, palette }), className)}
    component={component}
    {...props}
  >
    {children}
  </TextElement>
);

export default Text;
