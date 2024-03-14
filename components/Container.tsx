import { cn } from "@/utils/app.utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as: 'section' | 'div';
  className?: string;
  maxWidth: 'xl' | 'md' | 'lg' | 'sm';
};

const Container: any = ({ children, className, as: Component = 'div', maxWidth = 'xl' }: Props) => {
  return (
      <Component className={cn('w-full', className, {
        'max-w-screen-xl': maxWidth === 'xl',
        'max-w-screen-md': maxWidth === 'md',
        'max-w-screen-lg': maxWidth === 'lg',
        'max-w-screen-sm': maxWidth === 'sm',
      })}>
        {children}
      </Component>
  )
}

export default Container;
