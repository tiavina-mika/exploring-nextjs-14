'use client';
import { usePathname, useRouter } from "@/config/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/DropdownMenu"
import NextIcon from "../NextIcon";
import { IMenu } from "@/types/app.type";
import { Fragment } from "react";
import { getAbsoluteUrl, getTranslatedAbsoluteUrl } from "@/utils/app.utils";
import { useParams } from "next/navigation";
import { ROUTES } from "@/config/routes";

/**
 * add redirect query to logout url
 * @param menu 
 * @param fullUrl 
 * @returns 
 */
const getRedirectionUrl = (menu: IMenu, fullUrl: string): IMenu['value'] => {
  // add the current (full) url to redirect to it after logout
  if (menu.id === "logout") {
    return menu.value + '?redirect=' + fullUrl;
  }

  return menu.value;
}

type Props = {
  menus: IMenu[];
}
const AccountMenu = ({ menus }: Props) => {
  const router = useRouter();
  const pathname = usePathname() as string;
  const params = useParams() as Record<string, string>;
  const currentFullUrl = getTranslatedAbsoluteUrl(pathname, params);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:block !focus-visible:ring-transparent">
        <NextIcon
          alt=""
          src="/icons/user.svg"
          width={18}
          height={18}
          aria-hidden="true"
          className="mr-2 text-muted-foreground/70 focus-visible:ring-transparent"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 py-3">
        {menus.map((menu: IMenu, index: number) => (
          <Fragment key={index}>
            {menu.id === "logout" && <DropdownMenuSeparator />}
            <DropdownMenuItem onClick={() => router.push(getRedirectionUrl(menu, currentFullUrl))}>
              {menu.icon && (
                <NextIcon
                  alt=""
                  src={menu.icon as string}
                  width={18}
                  height={18}
                  aria-hidden="true"
                  className="mr-2 text-muted-foreground/70"
                />
              )}
              {menu.label}
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountMenu;