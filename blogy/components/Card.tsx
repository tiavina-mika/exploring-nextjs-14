import { ReactNode } from 'react';

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as UICard,
} from '@/components/ui/Card';
import { cn } from '@/utils/app.utils';

import Button from './buttons/Button';

type Props = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  buttonsDirection?: 'row' | 'column';
};
const Card = ({
  children,
  className,
  description,
  title,
  primaryButtonText,
  secondaryButtonText,
  buttonsDirection,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: Props) => (
  <UICard className={cn('w-[350px]', className)}>
    {/* title and description */}
    {title ||
      (description && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      ))}
    <CardContent>{children}</CardContent>
    {/* footer */}
    {onPrimaryButtonClick ||
      (onSecondaryButtonClick && (
        <CardFooter
          className={
            buttonsDirection === 'row'
              ? 'flexRow center spaceBetween'
              : 'flexColumn gap-3'
          }
        >
          {/* cancel button */}
          {secondaryButtonText && (
            <Button
              onClick={onSecondaryButtonClick}
              className={buttonsDirection === 'column' ? 'stretchSelf' : ''}
            >
              {secondaryButtonText}
            </Button>
          )}
          {/* submit button */}
          <Button
            variant="contained"
            onClick={onPrimaryButtonClick}
            className={buttonsDirection === 'column' ? 'stretchSelf' : ''}
          >
            {primaryButtonText}
          </Button>
        </CardFooter>
      ))}
  </UICard>
);

export default Card;
