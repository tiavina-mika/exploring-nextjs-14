import { createElement, HTMLAttributes, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

import { ButtonPaletteColor, TitleLevelType } from '@/types/component.type';

export const titleVariants = cva('font-primary', {
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
  },
});
// --------- types --------- //
type TitleProps = {
  level?: TitleLevelType;
  children: ReactNode;
  color?: ButtonPaletteColor;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants>;

type ElementProps = Pick<TitleProps, 'level' | 'children' | 'className'> &
  HTMLAttributes<HTMLHeadingElement>;

// --------- components --------- //
const Heading = ({ level, children, ...props }: ElementProps) => {
  if (!level) return null;
  return createElement(level, props, children);
};

const Title = ({
  children,
  color = 'default',
  className,
  level = 'h1',
  ...props
}: TitleProps) => (
  <Heading
    className={cn(titleVariants({ color }), className, 'dark:text-white')}
    level={level}
    {...props}
  >
    {children}
  </Heading>
);

export default Title;
