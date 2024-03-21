import React, { ReactNode } from 'react';

import Link, { type LinkProps } from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Link as TranslatedLink } from '@/config/navigation';
import { cn } from '@/utils/app.utils';

import Text from './Text';
import NextIcon from '../NextIcon';

export type TextLinkProps = LinkProps & {
  isExternal?: boolean;
  children?: ReactNode;
  alt?: string;
  className?: string;
  href?: any;
  translate?: boolean;
  underline?: boolean;
  variant?: 'text' | 'button';
};

const TextLink = ({
  children,
  alt,
  shallow,
  replace,
  scroll,
  prefetch,
  className,
  isExternal,
  href,
  variant = 'text',
  translate = true,
  underline = true,
}: TextLinkProps) => {
  const Component = translate ? TranslatedLink : Link;
  return (
    <Component
      href={href}
      shallow={shallow}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      target={isExternal ? '_blank' : undefined}
    >
      <Text
        as={"span" as any}
        className={cn('flex flex-row hover:opacity-90', className, {
          'underline': underline && variant === 'text',
          'bg-primary text-white rounded-sm px-3 py-1 hover:opacity-75': variant === 'button',
        })}
      >
        {isExternal ? (
          <Balancer as="span">
            <span className="max-w-[100%] leading-relaxed">{children}</span>
            <NextIcon
              priority
              src="/icons/external-link.svg"
              alt={alt}
              size={12}
            />
          </Balancer>
        ) : (
          children
        )}
      </Text>
    </Component>
  );
};

export default TextLink;
