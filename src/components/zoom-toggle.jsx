"use client"

import * as React from "react"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ZoomToggle() {
  const [isZoomed, setIsZoomed] = React.useState(false)

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    document.documentElement.style.fontSize = isZoomed ? '16px' : '18px'
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleZoom}
      title={isZoomed ? "Decrease text size" : "Increase text size"}
    >
      {isZoomed ? (
        <ZoomOut className="h-[1.5rem] w-[1.5rem]" />
      ) : (
        <ZoomIn className="h-[1.5rem] w-[1.5rem]" />
      )}
    </Button>
  )
}
