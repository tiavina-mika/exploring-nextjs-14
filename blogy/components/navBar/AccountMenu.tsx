'use client';
import { useRouter } from "@/config/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/DropdownMenu"
import { ROUTES } from "@/config/routes";
import NextIcon from "../NextIcon";
import { IMenu } from "@/types/app.type";
import { Fragment } from "react";

type Props = {
  menus: IMenu[];
}
const AccountMenu = ({ menus }: Props) => {
  const router = useRouter();

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
            <DropdownMenuItem onClick={() => router.push(menu.value)}>
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