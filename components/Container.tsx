import { cn } from "@/utils/app.utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as: 'section' | 'div';
  className?: string;
  maxWidth: 'xl' | 'md' | 'lg' | 'sm';
  withSpacingY: boolean;
};

const Container: any = ({ children, className, as: Component = 'div', maxWidth = 'xl', withSpacingY = true }: Props) => {
  return (
      <Component className={cn('w-full px-6', className, {
        'max-w-screen-xl': maxWidth === 'xl',
        'max-w-screen-md': maxWidth === 'md',
        'max-w-screen-lg': maxWidth === 'lg',
        'max-w-screen-sm': maxWidth === 'sm',
        'py-2 md:py-6': withSpacingY
      })}>
        {children}
      </Component>
  )
}

export default Container;
