import { ComponentPropsWithoutRef, Fragment } from "react";

import { cn } from "@/utils/app.utils";
import { cutText } from "@/utils/utils";
import TextLink from "./typography/TextLink";
import NextIcon from "./NextIcon";
import { useTranslations } from "next-intl";

type BreadcrumbsProps = ComponentPropsWithoutRef<"nav"> & {
  segments: {
    title: string;
    href: any;
  }[];
  separator?: string;
  truncationLength?: number;
};

export const Breadcrumbs = ({
  segments,
  separator,
  truncationLength = 0,
  className,
  ...props
}: BreadcrumbsProps) => {
  const t = useTranslations('NavBar');

  const newSegments = [
    {
      title: t('home'),
      href: '/',
    },
    ...segments
  ]

  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(
        "flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground",
        className,
      )}
      {...props}
    >
      {newSegments.map((segment, index) => {
        const isLastSegment = index === newSegments.length - 1;

        return (
          <Fragment key={segment.href}>
            <TextLink
              aria-current={isLastSegment ? "page" : undefined}
              href={segment.href}
              className={cn(
                "truncate transition-colors hover:opacity-70 font-normal text-sm",
                isLastSegment ? "text-gray-500 font-normal" : "text-primary",
              )}
              underline={false}
            >
              {truncationLength > 0 && segment.title
                ? cutText(segment.title, truncationLength)
                : segment.title}
            </TextLink>
            {!isLastSegment && (
              <NextIcon
                alt=""
                src={`/icons/${separator || 'chevrons-right'}.svg`}
                width={14}
                height={14}
                aria-hidden="true"
                className="mx-2"
              />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
