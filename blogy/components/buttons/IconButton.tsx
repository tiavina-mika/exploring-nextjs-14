import { ReactNode } from 'react';

import Button from './Button';

type Props = {
  children: ReactNode;
  className?: string;
};

const IconButton = ({ children, className, ...props }: Props) => (
  <Button className={className} {...props}>
    {children}
  </Button>
);

export default IconButton;
