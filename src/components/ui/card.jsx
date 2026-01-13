"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(
  (
    {
      className,
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const handleMouseMove = (e) => {
      onMouseMove?.(e)

      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
      if (!window.matchMedia?.("(pointer: fine)").matches) return

      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      el.style.setProperty("--tilt-x", `${x.toFixed(0)}px`)
      el.style.setProperty("--tilt-y", `${y.toFixed(0)}px`)

      const px = (x / rect.width) * 2 - 1
      const py = (y / rect.height) * 2 - 1

      const max = 8
      const ry = px * max
      const rx = -py * max

      el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`)
      el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`)
    }

    const handleMouseLeave = (e) => {
      onMouseLeave?.(e)
      const el = e.currentTarget
      el.style.setProperty("--tilt-rx", "0deg")
      el.style.setProperty("--tilt-ry", "0deg")
    }

    const handleMouseEnter = (e) => {
      onMouseEnter?.(e)
      const el = e.currentTarget
      el.style.setProperty("--tilt-rx", "0deg")
      el.style.setProperty("--tilt-ry", "0deg")
    }

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "tilt-card rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
