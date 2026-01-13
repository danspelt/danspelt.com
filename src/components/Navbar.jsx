"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { ZoomToggle } from "./zoom-toggle"

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-3xl mr-8">
          DS
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="text-lg">
            <NavigationMenuItem>
              <Link href="/about" className={cn(navigationMenuTriggerStyle(), "text-lg")}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/skillstools" className={cn(navigationMenuTriggerStyle(), "text-lg")}>
                Skills & Tools
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/hubbies" className={cn(navigationMenuTriggerStyle(), "text-lg")}>
                Hobby Projects
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/timeline" className={cn(navigationMenuTriggerStyle(), "text-lg")}>
                Timeline
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "text-lg")}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-2">
          <ZoomToggle />
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
