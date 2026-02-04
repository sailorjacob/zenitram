"use client"

import { useState, useEffect } from "react"
import { MagneticButton } from "@/components/magnetic-button"

interface LandingHeaderProps {
  isVisible: boolean
  currentPage: number
  onSkip: () => void
}

export function LandingHeader({ isVisible, currentPage, onSkip }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const isDarkPage = currentPage === 0 || currentPage === 3

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${isScrolled ? "bg-background/80 backdrop-blur-xl" : ""}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 md:py-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative h-16 w-16 md:h-20 md:w-20">
            <img
              src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
              alt="Zenitram"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <MagneticButton
            variant="ghost"
            size="default"
            onClick={onSkip}
            className={isDarkPage ? "text-foreground" : "text-foreground"}
          >
            Skip Intro
          </MagneticButton>
        </div>
      </nav>
    </header>
  )
}
