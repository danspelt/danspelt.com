"use client"

import { Navbar } from "./Navbar"
import { ChatWidget } from "./ChatWidget"

export function ClientWrapper() {
  return (
    <>
      <Navbar />
      <ChatWidget />
    </>
  )
}
