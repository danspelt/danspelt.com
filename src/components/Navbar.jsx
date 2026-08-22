"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { ZoomToggle } from "./zoom-toggle";

const navGroups = [
  {
    label: "About",
    items: [
      { href: "/about", label: "About", description: "Background, focus, and how I work" },
      { href: "/accessibility", label: "Accessibility", description: "Inclusive design and compliance" },
      { href: "/skillstools", label: "Skills", description: "Tools and technical strengths" },
      { href: "/timeline", label: "Timeline", description: "Career path and milestones" },
    ],
  },
  {
    label: "Work",
    items: [
      { href: "/case-studies", label: "Case Studies", description: "Problem, approach, and outcomes" },
      { href: "/projects", label: "Projects", description: "Shipped products and builds" },
      { href: "https://audit.danspelt.com", label: "Clarity Audit", description: "Run a website accessibility scan" },
      { href: "/custom-software", label: "Custom Software", description: "Services for business teams" },
    ],
  },
  {
    label: "Connect",
    items: [
      { href: "/faq", label: "FAQ", description: "Common questions answered" },
      { href: "/ai-chat", label: "AI Chat", description: "Chat with Dan's AI assistant" },
      { href: "/contact", label: "Contact", description: "Start a conversation" },
    ],
  },
];

function isGroupActive(pathname, items) {
  return items.some((item) => pathname === item.href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/65">
      <div className="flex h-16 items-center gap-3 px-4 container mx-auto">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-foreground shrink-0 rounded-md focus-ring transition-colors hover:text-primary"
          aria-label="Dan Spelt — home"
        >
          Dan Spelt
        </Link>

        <Link
          href="/case-studies/community-hive"
          className={cn(
            "hidden lg:inline-flex ml-6 text-sm font-medium transition-colors rounded-md px-2 py-1",
            pathname === "/case-studies/community-hive"
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Community Hive
        </Link>

        <NavigationMenu className="hidden lg:flex ml-2" aria-label="Primary">
          <NavigationMenuList>
            {navGroups.map((group) => {
              const active = isGroupActive(pathname, group.items);
              return (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent text-sm font-medium",
                      active
                        ? "bg-primary/10 text-primary data-[state=open]:bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[22rem] gap-1 rounded-md border border-border bg-popover p-3 shadow-lg">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "block select-none rounded-md px-3 py-2.5 no-underline outline-none transition-colors",
                                "hover:bg-muted focus:bg-muted focus-ring",
                                pathname === item.href && "bg-primary/10"
                              )}
                            >
                              <div
                                className={cn(
                                  "text-sm font-medium leading-none",
                                  pathname === item.href
                                    ? "text-primary"
                                    : "text-foreground"
                                )}
                              >
                                {item.label}
                              </div>
                              <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}

          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <ZoomToggle />
          <ModeToggle />
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted focus-ring"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t bg-background/95 backdrop-blur-md"
        >
          <nav
            aria-label="Mobile"
            className="container mx-auto px-4 py-4 flex flex-col gap-5 max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <Link
              href="/case-studies/community-hive"
              className={cn(
                "rounded-md px-3 py-3 text-base font-medium transition-colors focus-ring",
                pathname === "/case-studies/community-hive"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              Community Hive
            </Link>
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-3 text-base font-medium transition-colors focus-ring",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
