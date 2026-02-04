"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { LandingHeader } from "./landing-header"
import { ProgressIndicator } from "./progress-indicator"
import { Page1Hero } from "./page-1-hero"
import { Page2Philosophy } from "./page-2-philosophy"
import { Page3Services } from "./page-3-services"
import { Page4Technology } from "./page-4-technology"
import { Page5CTA } from "./page-5-cta"
import { GalaxyTransition } from "./galaxy-transition"

interface LandingWrapperProps {
  onComplete: () => void
  children: React.ReactNode
}

export function LandingWrapper({ onComplete, children }: LandingWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLandingComplete, setIsLandingComplete] = useState(false)
  const [galaxyProgress, setGalaxyProgress] = useState(0)
  const [showGalaxy, setShowGalaxy] = useState(false)

  const TOTAL_LANDING_PAGES = 5

  const scrollToPage = useCallback((pageIndex: number) => {
    if (!containerRef.current) return
    const pageHeight = window.innerHeight
    const targetScroll = pageIndex * pageHeight

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    })
  }, [])

  const handleSkip = useCallback(() => {
    setIsLandingComplete(true)
    const landingHeight = window.innerHeight * TOTAL_LANDING_PAGES
    window.scrollTo({
      top: landingHeight,
      behavior: "smooth",
    })
    setTimeout(onComplete, 500)
  }, [onComplete, TOTAL_LANDING_PAGES])

  const handleContinue = useCallback(() => {
    const nextPage = Math.min(currentPage + 1, TOTAL_LANDING_PAGES)
    if (nextPage === TOTAL_LANDING_PAGES) {
      handleSkip()
    } else {
      scrollToPage(nextPage)
    }
  }, [currentPage, scrollToPage, handleSkip, TOTAL_LANDING_PAGES])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const pageHeight = window.innerHeight
      const landingHeight = pageHeight * TOTAL_LANDING_PAGES

      // Calculate current page
      const page = Math.floor(scrollTop / pageHeight)
      setCurrentPage(Math.min(page, TOTAL_LANDING_PAGES - 1))

      // Check if landing is complete
      if (scrollTop >= landingHeight - 100) {
        setIsLandingComplete(true)
        onComplete()
      } else {
        setIsLandingComplete(false)
      }

      // Galaxy transition calculation (between pages 3 and 4)
      const page4Start = pageHeight * 3
      const page5Start = pageHeight * 4
      const galaxyTransitionStart = page4Start + pageHeight * 0.5
      const galaxyTransitionEnd = page5Start

      if (scrollTop >= galaxyTransitionStart && scrollTop <= galaxyTransitionEnd) {
        setShowGalaxy(true)
        const progress = (scrollTop - galaxyTransitionStart) / (galaxyTransitionEnd - galaxyTransitionStart)
        setGalaxyProgress(Math.max(0, Math.min(1, progress)))
      } else {
        setShowGalaxy(scrollTop >= galaxyTransitionStart - 200 && scrollTop <= galaxyTransitionEnd + 200)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [onComplete, TOTAL_LANDING_PAGES])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLandingComplete) return

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        scrollToPage(Math.min(currentPage + 1, TOTAL_LANDING_PAGES - 1))
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        scrollToPage(Math.max(currentPage - 1, 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, isLandingComplete, scrollToPage, TOTAL_LANDING_PAGES])

  return (
    <div ref={containerRef} className="relative">
      {/* Landing Header */}
      <LandingHeader
        isVisible={!isLandingComplete}
        currentPage={currentPage}
        onSkip={handleSkip}
      />

      {/* Progress Indicator */}
      <ProgressIndicator
        currentPage={currentPage}
        totalPages={TOTAL_LANDING_PAGES}
        onPageClick={scrollToPage}
      />

      {/* Galaxy Transition */}
      <GalaxyTransition progress={galaxyProgress} isVisible={showGalaxy} />

      {/* Landing Pages */}
      <div className="landing-pages">
        <Page1Hero onContinue={handleContinue} />
        <Page2Philosophy />
        <Page3Services />
        <Page4Technology />
        <Page5CTA onContinue={handleContinue} />
      </div>

      {/* Existing Homepage */}
      <div className="existing-homepage">{children}</div>
    </div>
  )
}
