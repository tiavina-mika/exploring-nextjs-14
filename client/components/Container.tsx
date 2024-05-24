import { cn } from "@/utils/app.utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as: 'section' | 'div' | 'header';
  rootClassName?: string;
  className?: string;
  maxWidth: 'xl' | 'md' | 'lg' | 'sm' | 'xs';
  withSpacingY: boolean;
};

const Container: any = ({ children, rootClassName, className, as: Component = 'div', maxWidth = 'xl', withSpacingY = true }: Props) => {
  return (
      <Component
        className={cn(
          // the padding-x here is important for mobile mainly
          'w-full px-4 flex flex-col lg:items-center ',
          rootClassName,
          { 'py-2 md:py-6': withSpacingY }
        )}>
        <div className={cn('w-full', className, {
          'max-w-screen-xl': maxWidth === 'xl',
          'max-w-screen-md': maxWidth === 'md',
          'max-w-screen-lg': maxWidth === 'lg',
          'max-w-screen-sm': maxWidth === 'sm',
          'max-w-screen-xs': maxWidth === 'xs',
        })}
        >
          {children}
        </div>
      </Component>
  )
}

export default Container;
