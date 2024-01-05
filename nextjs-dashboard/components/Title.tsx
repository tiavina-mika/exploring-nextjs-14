import { ButtonPaletteColor, TitleLevelType } from '@/types/component.type';
import { HTMLAttributes, ReactNode, createElement } from 'react';
import { VariantProps, cva } from "class-variance-authority";
import { cn } from '@/utils/utils';

export const titleVariants = cva(
  "font-primary",
  {
    variants: {
      color: {
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        error: "text-error",
        info: "text-info",
        warning: "text-warning",
        default: "text-black",
      },
    },
  }
);

type Props = {
  level?: TitleLevelType;
  children: ReactNode;
  color?: ButtonPaletteColor;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof titleVariants>;

type Props2 = Pick<Props, 'level' | 'children' | 'className'> & HTMLAttributes<HTMLHeadingElement>

const Heading = ({ level, children, ...props }: Props2) => {
  if (!level) return null;
  return createElement(level, props, children);
}

const Title = ({ children, color = "default", className, level = "h1", ...props }: Props) => {
  return (
    <Heading
      className={cn(titleVariants({ color }), className)}
      level={level}
      {...props}
    >
      {children}
    </Heading>
  );
};

export default Title;
