"use client"

import { useState, useEffect, useCallback, RefObject } from "react"

export function useScrollProgress(containerRef: RefObject<HTMLElement>, totalPages: number) {
  const [currentPage, setCurrentPage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight
    const clientHeight = container.clientHeight
    const maxScroll = scrollHeight - clientHeight

    if (maxScroll <= 0) return

    const progress = scrollTop / maxScroll
    setScrollProgress(progress)

    // Calculate current page based on scroll position
    const pageHeight = clientHeight
    const page = Math.round(scrollTop / pageHeight)
    setCurrentPage(Math.min(page, totalPages - 1))
  }, [containerRef, totalPages])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("scroll", updateProgress, { passive: true })
    return () => container.removeEventListener("scroll", updateProgress)
  }, [containerRef, updateProgress])

  return { currentPage, scrollProgress }
}
