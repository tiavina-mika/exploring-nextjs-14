"use client"

import {
  DropdownMenu as UIDropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu"
import { IMenuItem } from "@/types/app.type"
import { ReactNode } from "react"
import NextIcon from "./NextIcon"

type Props = {
  menus: IMenuItem[];
  title?: string;
  trigger?: ReactNode;
}
const DropdownMenu = ({ menus, title, trigger }: Props) => {
  return (
    <UIDropdownMenu>
      <DropdownMenuTrigger>
        {trigger || (
          <NextIcon
            alt="menus"
            src="/icons/more-horizontal.svg"
            width={18}
            height={18}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {title && (
          <>
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {menus.map((menu: IMenuItem, index: number) => (
          <DropdownMenuItem key={index} onClick={menu.onClick}>
            {menu.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </UIDropdownMenu>
  )
}

export default DropdownMenu
