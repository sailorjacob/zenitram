"use client"

import type React from "react"

interface SectionBackgroundProps {
  children: React.ReactNode
}

export function SectionBackground({ children }: SectionBackgroundProps) {
  return <div className="relative w-full h-full">{children}</div>
}
