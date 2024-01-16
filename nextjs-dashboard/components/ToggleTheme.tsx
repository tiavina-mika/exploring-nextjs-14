"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import Button from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import NextIcon from "./NextIcon";

const ToggleTheme = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outlined">
          <NextIcon alt="" src="/icons/sun.svg" width={4} height={4} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <NextIcon alt="" src="/icons/moon.svg" width={4} height={4} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-10" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToggleTheme;