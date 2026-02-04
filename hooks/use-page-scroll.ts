"use client"

import { useState, useEffect, useCallback } from "react"

export function usePageScroll() {
  const [isLandingActive, setIsLandingActive] = useState(true)
  const [landingProgress, setLandingProgress] = useState(0)

  const scrollToPage = useCallback((pageIndex: number) => {
    const pageHeight = window.innerHeight
    const targetScroll = pageIndex * pageHeight

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const landingHeight = window.innerHeight * 5 // 5 landing pages
      const progress = Math.min(scrollTop / landingHeight, 1)
      
      setLandingProgress(progress)
      setIsLandingActive(progress < 1)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { isLandingActive, landingProgress, scrollToPage }
}
