import React, { ReactNode } from 'react';
import Link, { type LinkProps } from 'next/link';
import Balancer from 'react-wrap-balancer';
import Image from 'next/image';
import Text from './Text';

type TextLinkProps = LinkProps & {
  isExternal?: boolean;
  noOfLines?: number;
  children?: ReactNode;
  alt?: string;
};

export const TextLink = ({
  children,
  href,
  alt,
  shallow,
  replace,
  scroll,
  prefetch,
  isExternal,
  noOfLines,
  ...textProps
}: TextLinkProps) => (
  <Link
    href={href}
    shallow={shallow}
    replace={replace}
    scroll={scroll}
    prefetch={prefetch}
    target={isExternal ? '_blank' : undefined}
  >
    <Text component="span" className="inline-block underline flex flex-row" {...textProps}>
      {isExternal
        ? (
          <Balancer as="span">
            <span className="max-w-[100%] leading-relaxed">{children}</span>
            <Image
              priority
              src="/icons/external-link.svg"
              alt={alt || ''}
              height={12}
              width={12}
            />
          </Balancer>
        )
        : children}
    </Text>
  </Link>
);
