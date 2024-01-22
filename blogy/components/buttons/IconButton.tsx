import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/utils';

type Props = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, className, ...props }: Props) => (
  <button
    className={cn(
      'rounded-full bg-transparent p-4 hover:bg-gray-50',
      className,
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
