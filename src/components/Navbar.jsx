"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { ZoomToggle } from "./zoom-toggle";

const navItems = [
  { href: "/work", label: "All Work" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/skillstools", label: "Skills" },
  { href: "/about", label: "About" },
];

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

        <nav className="hidden lg:flex ml-8 items-center gap-1" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-ring",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}>{item.label}</Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ZoomToggle />
          <ModeToggle />
          <Link href="/contact?intent=hire" className="hidden sm:inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-ring">
            Discuss a role
          </Link>
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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                "rounded-md px-3 py-3 text-base font-medium transition-colors focus-ring",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}>{item.label}</Link>
            ))}
            <Link href="/contact?intent=hire" className="rounded-md bg-primary px-3 py-3 text-center text-base font-medium text-primary-foreground focus-ring">
              Discuss a role
            </Link>
            <Link href="/custom-software" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted focus-ring">
              Custom software services
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
