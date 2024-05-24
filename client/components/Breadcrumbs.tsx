import { ComponentPropsWithoutRef, Fragment } from "react";

import { cn } from "@/utils/app.utils";
import { cutText } from "@/utils/utils";
import TextLink from "./typography/TextLink";
import NextIcon from "./NextIcon";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/config/routes";

type BreadcrumbsProps = ComponentPropsWithoutRef<"nav"> & {
  segments: {
    title: string;
    href: any;
  }[];
  separator?: string;
  truncationLength?: number;
  isPrivateRoute?: boolean;
};

export type IBreadCrumbSegment = BreadcrumbsProps['segments'];

export const Breadcrumbs = ({
  segments,
  separator,
  truncationLength = 0,
  className,
  isPrivateRoute = false,
  ...props
}: BreadcrumbsProps) => {
  const t = useTranslations('NavBar');

  const newSegments = [
    isPrivateRoute ? {
      title: t('dashboard'),
      href: ROUTES.dashboard,
    } : {
      title: t('home'),
      href: '/',
    },
    ...segments
  ]

  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(
        "flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground mb-4 md:mb-8",
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
                "truncate transition-colors hover:opacity-70 font-normal text-md",
                isLastSegment ? "text-gray-800 font-bold" : "text-gray-600 font-normal",
              )}
              underline={false}
            >
              {truncationLength > 0 && segment.title
                ? cutText(segment.title, truncationLength)
                : segment.title}
            </TextLink>
            {/* do not display icon in the last link */}
            {!isLastSegment && (
              <NextIcon
                src={`/icons/${separator || 'chevron-right'}.svg`}
                size={14}
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
