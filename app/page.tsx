"use client"
import { FeaturesSection } from "@/components/sections/features-section"
import { SolutionsSection } from "@/components/sections/solutions-section"
import { TechnologySection } from "@/components/sections/technology-section"
import { ShowcaseSection } from "@/components/sections/showcase-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedText } from "@/components/animated-text"
import { DreamVideoBackground } from "@/components/dream-video-background"
import { useRef, useEffect, useState, useCallback } from "react"

type ThemeAccent = "sand" | "silver" | "sapphire" | "emerald"

const THEME_COLORS = {
  sand: { color: "oklch(0.85 0.12 50)", name: "Orange" },
  silver: { color: "oklch(0.75 0.02 260)", name: "Silver" },
  sapphire: { color: "oklch(0.65 0.2 250)", name: "Blue" },
  emerald: { color: "oklch(0.7 0.18 160)", name: "Green" },
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const verticalScrollRef = useRef<HTMLDivElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [themeAccent, setThemeAccent] = useState<ThemeAccent>("silver")
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const themeDropdownRef = useRef<HTMLDivElement>(null)
  const [isOnVideoPage, setIsOnVideoPage] = useState(false)
  const [verticalScrollPosition, setVerticalScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [video1Complete, setVideo1Complete] = useState(false)
  const [video2Complete, setVideo2Complete] = useState(false)
  const [video2TextVisible, setVideo2TextVisible] = useState(false)

  const features = [
    {
      title: "Intelligent Lighting",
      description: "Adaptive lighting that responds to your circadian rhythm, adjusts color temperature throughout the day, and learns your preferences for personalized ambiance."
    },
    {
      title: "Climate Control",
      description: "Precise temperature management with AI-powered learning, geofencing integration, and predictive adjustments based on weather patterns."
    },
    {
      title: "Security Systems",
      description: "Advanced monitoring with real-time alerts, multi-point door and window sensors, integrated camera feeds, and automated response protocols."
    },
    {
      title: "Audio Integration",
      description: "Whole-home audio distribution with room-by-room control, streaming services integration, and voice-activated command capabilities."
    },
    {
      title: "Energy Management",
      description: "Real-time consumption monitoring, automated optimization, renewable energy integration, and detailed usage analytics for sustainability."
    },
    {
      title: "Mobile Control",
      description: "Seamless app-based control from anywhere in the world with instant feedback, automation scheduling, and emergency override features."
    }
  ]

  useEffect(() => {
    setIsLoaded(true)
    
    // Set window height for SSR safety
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
      
      const handleResize = () => setWindowHeight(window.innerHeight)
      window.addEventListener('resize', handleResize)
      
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Preload video metadata for scrubbing
    if (video1Ref.current) {
      video1Ref.current.load()
    }
    if (video2Ref.current) {
      video2Ref.current.load()
    }
  }, [])

  // Apply theme accent to CSS custom property
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--accent", THEME_COLORS[themeAccent].color)
  }, [themeAccent])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false)
      }
    }

    if (isThemeDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isThemeDropdownOpen])

  const handleThemeSelect = (theme: ThemeAccent) => {
    setThemeAccent(theme)
    setIsThemeDropdownOpen(false)
  }

  // Track scroll progress for dream video background
  const updateScrollProgress = useCallback(() => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const maxScroll = container.scrollWidth - container.clientWidth
    const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0
    setScrollProgress(progress)
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current || !verticalScrollRef.current || typeof window === 'undefined') return

      const sectionWidth = scrollContainerRef.current.offsetWidth
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      const isAtEnd = scrollLeft >= maxScroll - 10
      const isAtStart = scrollLeft <= 10
      
      // Check if we're on the video page
      const verticalScroll = verticalScrollRef.current.scrollTop
      const currentWindowHeight = window.innerHeight
      const isVideoPageVisible = verticalScroll > currentWindowHeight * 0.3
      
      // Video lock boundaries
      const video2Start = currentWindowHeight * 2.5

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // If at the last section and scrolling down, allow vertical scroll to video page
        if (isAtEnd && e.deltaY > 0 && !isVideoPageVisible) {
          e.preventDefault()
          
          // Limit scroll speed to prevent jumping
          const scrollAmount = Math.min(Math.abs(e.deltaY), 100)
          verticalScrollRef.current.scrollBy({
            top: scrollAmount,
            behavior: "instant",
          })
          setIsOnVideoPage(verticalScrollRef.current.scrollTop > currentWindowHeight * 0.5)
          return
        }
        
        // If on video page, control vertical scrolling with lock check
        if (verticalScroll > 0 && isAtEnd) {
          e.preventDefault()
          
          // Check video 1 lock
          const newScrollTop = verticalScroll + e.deltaY
          if (newScrollTop >= video2Start - 50 && !video1Complete) {
            // Lock at video 1 boundary
            verticalScrollRef.current.scrollTop = video2Start - 50
            return
          }
          
          // If scrolling up, go back to horizontal sections
          if (e.deltaY < 0) {
            if (verticalScroll - Math.abs(e.deltaY) <= 0) {
              verticalScrollRef.current.scrollTo({
                top: 0,
                behavior: "instant",
              })
              setIsOnVideoPage(false)
            } else {
              // Limit scroll speed
              const scrollAmount = Math.max(e.deltaY, -100)
              verticalScrollRef.current.scrollBy({
                top: scrollAmount,
                behavior: "instant",
              })
              setIsOnVideoPage(verticalScrollRef.current.scrollTop > currentWindowHeight * 0.5)
            }
          } else {
            // Scrolling down - limit speed
            const scrollAmount = Math.min(e.deltaY, 100)
            verticalScrollRef.current.scrollBy({
              top: scrollAmount,
              behavior: "instant",
            })
          }
          return
        }

        // Normal horizontal scroll
        if (!isVideoPageVisible) {
          e.preventDefault()
          scrollContainerRef.current.scrollBy({
            left: e.deltaY,
            behavior: "instant",
          })

          const newScrollLeft = scrollContainerRef.current.scrollLeft
          const newSection = Math.round(newScrollLeft / sectionWidth)

          if (newSection !== currentSection) {
            setCurrentSection(newSection)
          }
          
          updateScrollProgress()
        }
      }
    }

    const handleScroll = () => {
      updateScrollProgress()
      
      if (!scrollContainerRef.current) return
      const sectionWidth = scrollContainerRef.current.offsetWidth
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const newSection = Math.round(scrollLeft / sectionWidth)
      
      if (newSection !== currentSection) {
        setCurrentSection(newSection)
      }
    }

    const handleVerticalScroll = () => {
      if (!verticalScrollRef.current || !scrollContainerRef.current || typeof window === 'undefined') return
      let verticalScroll = verticalScrollRef.current.scrollTop
      
      // Check if we're at the last horizontal section
      const sectionWidth = scrollContainerRef.current.offsetWidth
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      const isAtEnd = scrollLeft >= maxScroll - 50
      
      // CRITICAL: Prevent vertical scrolling if not at the last horizontal section
      if (!isAtEnd && verticalScroll > 0) {
        verticalScrollRef.current.scrollTop = 0
        return
      }
      
      const currentWindowHeight = window.innerHeight
      setIsOnVideoPage(verticalScroll > currentWindowHeight * 0.3)
      
      // Video scrubbing logic
      const video1Start = currentWindowHeight
      const video1End = currentWindowHeight * 2.5
      const video2Start = currentWindowHeight * 2.5
      const video2End = currentWindowHeight * 4
      
      // ENFORCE LOCK: If scrolled past boundary without completing video 1, snap back
      if (verticalScroll >= video2Start - 50 && !video1Complete) {
        verticalScrollRef.current.scrollTop = video2Start - 50
        verticalScroll = video2Start - 50
        // Don't process further
        setVerticalScrollPosition(verticalScroll)
        return
      }
      
      // First video scrubbing
      if (video1Ref.current && verticalScroll >= video1Start && verticalScroll < video2Start) {
        const video1Progress = Math.min(1, Math.max(0, (verticalScroll - video1Start) / (video1End - video1Start)))
        const video1Time = video1Progress * video1Ref.current.duration
        if (!isNaN(video1Time) && video1Ref.current.duration > 0) {
          video1Ref.current.currentTime = Math.min(video1Time, video1Ref.current.duration - 0.001)
          
          // Mark complete at 95%
          if (video1Progress >= 0.95 && !video1Complete) {
            setVideo1Complete(true)
          }
          
          // Reset if scrolling back
          if (video1Progress < 0.1 && video1Complete) {
            setVideo1Complete(false)
          }
        }
      }
      
      // Second video scrubbing - free scrolling
      if (video2Ref.current && verticalScroll >= video2Start) {
        const video2Progress = Math.min(1, Math.max(0, (verticalScroll - video2Start) / (video2End - video2Start)))
        const video2Time = video2Progress * video2Ref.current.duration
        if (!isNaN(video2Time) && video2Ref.current.duration > 0) {
          video2Ref.current.currentTime = Math.min(video2Time, video2Ref.current.duration - 0.001)
        }
        
        // Show text
        if (!video2TextVisible) {
          setVideo2TextVisible(true)
        }
      } else if (verticalScroll < video2Start && video2TextVisible) {
        setVideo2TextVisible(false)
      }
      
      setVerticalScrollPosition(verticalScroll)
    }

    const container = scrollContainerRef.current
    const verticalContainer = verticalScrollRef.current
    
    // Touch handling for mobile
    let touchStartY = 0
    let touchStartX = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollContainerRef.current || !verticalScrollRef.current) return
      
      const touchY = e.touches[0].clientY
      const touchX = e.touches[0].clientX
      const deltaY = touchStartY - touchY
      const deltaX = touchStartX - touchX
      
      const sectionWidth = scrollContainerRef.current.offsetWidth
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      const isAtEnd = scrollLeft >= maxScroll - 50
      const verticalScroll = verticalScrollRef.current.scrollTop
      
      // If trying to scroll down vertically but not at the end, prevent it
      if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0 && !isAtEnd && verticalScroll === 0) {
        e.preventDefault()
      }
    }
    
    if (container && verticalContainer) {
      verticalContainer.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("scroll", handleScroll, { passive: true })
      verticalContainer.addEventListener("scroll", handleVerticalScroll, { passive: true })
      verticalContainer.addEventListener("touchstart", handleTouchStart, { passive: true })
      verticalContainer.addEventListener("touchmove", handleTouchMove, { passive: false })
    }

    return () => {
      if (container && verticalContainer) {
        verticalContainer.removeEventListener("wheel", handleWheel)
        container.removeEventListener("scroll", handleScroll)
        verticalContainer.removeEventListener("scroll", handleVerticalScroll)
        verticalContainer.removeEventListener("touchstart", handleTouchStart)
        verticalContainer.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [currentSection, updateScrollProgress, video1Complete, video2TextVisible])

  return (
    <main 
      ref={verticalScrollRef}
      className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-black"
      style={{ 
        scrollbarWidth: "none", 
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "none",
        scrollSnapType: "none"
      }}
    >
      {/* First page - horizontal slides */}
      <div className="relative h-screen w-full">
        {/* Dream video background with circular portal effect */}
        <div 
          className="transition-opacity duration-700"
          style={{ 
            opacity: isOnVideoPage ? 0 : 1,
            visibility: isOnVideoPage ? 'hidden' : 'visible'
          }}
        >
          <DreamVideoBackground scrollProgress={scrollProgress} currentSection={currentSection} />
        </div>
        
        <div 
          className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-700" 
          style={{ 
            opacity: isOnVideoPage ? 0 : 1,
            visibility: isOnVideoPage ? 'hidden' : 'visible'
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(5, 5, 8, 0.7) 25%, rgba(3, 3, 6, 0.65) 50%, rgba(8, 8, 12, 0.7) 75%, rgba(0, 0, 0, 0.75) 100%)",
            }}
          />
          {/* Subtle cream grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, transparent 24%, rgba(200, 180, 150, 1) 25%, rgba(200, 180, 150, 1) 26%, transparent 27%, transparent 74%, rgba(200, 180, 150, 1) 75%, rgba(200, 180, 150, 1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(200, 180, 150, 1) 25%, rgba(200, 180, 150, 1) 26%, transparent 27%, transparent 74%, rgba(200, 180, 150, 1) 75%, rgba(200, 180, 150, 1) 76%, transparent 77%, transparent)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>
        </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-3 transition-all duration-700 md:px-12 md:py-6 ${isLoaded ? "opacity-100" : "opacity-0"} ${isOnVideoPage ? "opacity-0 pointer-events-none" : ""}`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center transition-transform hover:scale-110 flex-shrink-0"
        >
          <div className="relative h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32">
            <img
              src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
              alt="Zenitram Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Home", "Features", "Solutions", "Technology", "Showcase"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-accent" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <AnimatedText text={item} variant="wave" />
              <span
                className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme color switcher dropdown */}
          <div ref={themeDropdownRef} className="relative">
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 border-2 border-white/80"
              style={{ 
                backgroundColor: THEME_COLORS[themeAccent].color,
              }}
              title={`Theme: ${THEME_COLORS[themeAccent].name}`}
            />
            
            {/* Dropdown menu */}
            {isThemeDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col gap-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-2 z-50">
                {(Object.keys(THEME_COLORS) as ThemeAccent[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleThemeSelect(theme)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      themeAccent === theme 
                        ? "ring-2 ring-white/60 ring-offset-2 ring-offset-black" 
                        : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ 
                      backgroundColor: THEME_COLORS[theme].color,
                    }}
                    title={THEME_COLORS[theme].name}
                  />
                ))}
              </div>
            )}
          </div>

          <MagneticButton variant="secondary" onClick={() => scrollToSection(5)} className="flex-shrink-0">
            Start
          </MagneticButton>
        </div>
      </nav>

        <div
          ref={scrollContainerRef}
          data-scroll-container
          className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
        {/* Hero Section */}
        <section className="relative flex h-screen w-screen shrink-0 flex-col items-center justify-center px-4 pt-32 pb-20 sm:px-6 md:px-12 md:py-24">
          {/* Left-side decorative elements - CSS only, no JS */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Large animated gradient orbs on left */}
            <div className="absolute -left-32 top-1/4 h-[600px] w-[600px] animate-blob rounded-full bg-accent/8 blur-3xl" />
            <div className="absolute left-0 top-1/2 h-[500px] w-[500px] animate-blob animation-delay-2000 rounded-full bg-accent/6 blur-3xl" />
            <div className="absolute -left-20 bottom-1/4 h-[550px] w-[550px] animate-blob animation-delay-4000 rounded-full bg-accent/7 blur-3xl" />
            
            {/* Rotating rings on left */}
            <div className="absolute left-24 top-1/3 opacity-[0.12]">
              <div className="relative h-96 w-96">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-accent/50" style={{ animationDuration: "45s" }} />
                <div className="absolute inset-12 animate-spin-slow rounded-full border-2 border-dotted border-accent/40" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
                <div className="absolute inset-24 animate-spin-slow rounded-full border border-accent/30" style={{ animationDuration: "60s" }} />
              </div>
            </div>
            
            {/* Additional rotating rings on left - lower */}
            <div className="absolute left-32 bottom-1/4 opacity-[0.1]">
              <div className="relative h-80 w-80">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-accent/45" style={{ animationDuration: "55s", animationDirection: "reverse" }} />
                <div className="absolute inset-16 animate-spin-slow rounded-full border border-dashed border-accent/35" style={{ animationDuration: "40s" }} />
              </div>
            </div>
            
            {/* Left side accent circles */}
            <div className="absolute left-12 top-24 h-20 w-20 animate-pulse rounded-full border-2 border-accent/25 bg-accent/5" style={{ animationDuration: "4s" }} />
            <div className="absolute left-8 top-1/2 h-16 w-16 animate-pulse rounded-full border-2 border-accent/30 bg-accent/5" style={{ animationDuration: "5s" }} />
            <div className="absolute left-16 bottom-32 h-24 w-24 animate-pulse rounded-full border-2 border-accent/20 bg-accent/5" style={{ animationDuration: "6s" }} />
            <div className="absolute left-40 top-1/4 h-12 w-12 animate-pulse rounded-full border border-accent/35" style={{ animationDuration: "4.5s" }} />
            <div className="absolute left-20 bottom-1/3 h-14 w-14 animate-pulse rounded-full border border-accent/28" style={{ animationDuration: "5.5s" }} />
          </div>
          
          <div className="max-w-4xl relative z-10 w-full">
            <h1 className="mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-3xl sm:text-4xl font-light leading-tight tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl text-center">
              <span className="block">
                <AnimatedText text="Intelligent Living" variant="wave" shimmer shimmerSpeed="normal" />
              </span>
              <span className="block">
                <AnimatedText text="for Modern Homes" variant="wave" shimmer shimmerSpeed="slow" />
              </span>
            </h1>
            <p className="mb-6 sm:mb-8 mx-auto animate-in fade-in slide-in-from-bottom-4 text-sm sm:text-base leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-lg text-center max-w-2xl px-2">
              Transform your space with seamless automation. Control lighting, climate, security, and entertainment from
              anywhere. Designed for elegance, built for intelligence.
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-3 sm:gap-4 duration-1000 delay-300 sm:flex-row sm:items-center justify-center px-4">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)} className="w-full sm:w-auto">
                <AnimatedText text="Explore Features" variant="wave" />
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(4)} className="w-full sm:w-auto">
                <AnimatedText text="See Demo" variant="wave" />
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500 z-20">
            <p className="font-mono text-xs text-foreground/40">© 2026 Zenitram</p>
          </div>
        </section>

        {/* Features Section - scrollable on mobile so all bullets/content are readable */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-start justify-center overflow-y-auto overflow-x-hidden px-4 pt-24 pb-24 sm:px-6 sm:pb-28 md:items-center md:overflow-visible md:pb-0 md:pt-0 lg:px-16">
          <FeaturesSection />
        </section>

        {/* Solutions Section */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-24 sm:px-6 md:px-12 md:pt-0 lg:px-16">
          <SolutionsSection />
        </section>

        {/* Technology Section */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-24 sm:px-6 md:px-12 md:pt-0 lg:px-16">
          <TechnologySection />
        </section>

        {/* Showcase Section */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-24 sm:px-6 md:px-12 md:pt-0 lg:px-16">
          <ShowcaseSection />
        </section>

        {/* Contact Section */}
        <section className="relative flex h-screen w-screen shrink-0 items-center px-4 pt-24 md:px-12 md:pt-0 lg:px-16">
          <ContactSection scrollToSection={scrollToSection} />
        </section>
        </div>
      </div>

      {/* First video page - Scroll-controlled with Star Wars text */}
      <div className="relative w-full" style={{ height: '150vh' }}>
        {/* Scroll-controlled video background - Sticky to viewport */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <video
            ref={video1Ref}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source
              src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/btcxkg/sides2721_Create_a_website_image_asset_for_this_type_of_websi_1132009b-bf1e-4a5c-996b-2905acebeaba_1.mp4"
              type="video/mp4"
            />
          </video>
          
          {/* Removed dark overlay for better video visibility */}
          
          {/* Star Wars style scrolling text */}
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none z-20" style={{ perspective: "600px", perspectiveOrigin: "50% 100%" }}>
            <div 
              className="w-full max-w-4xl px-8 text-center"
              style={{
                transform: windowHeight > 0 && verticalScrollPosition >= windowHeight
                  ? `rotateX(45deg) translateZ(-200px) translateY(${Math.max(-100, 100 - ((verticalScrollPosition - windowHeight) / (windowHeight * 1.5)) * 200)}%)` 
                  : 'rotateX(45deg) translateZ(-200px) translateY(100%)',
                transformOrigin: "50% 100%",
                transformStyle: "preserve-3d",
                transition: 'none'
              }}
            >
              <div className="space-y-16">
                <h2 className="text-6xl md:text-7xl font-bold text-accent mb-20 tracking-widest animate-pulse" style={{ 
                  textShadow: "0 0 40px currentColor, 0 0 80px currentColor, 0 8px 40px rgba(0, 0, 0, 1)",
                  letterSpacing: "0.2em"
                }}>
                  ZENITRAM
                </h2>
                
                <div className="text-4xl md:text-5xl font-light text-foreground mb-24 tracking-wide" style={{ 
                  textShadow: "0 8px 40px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 1)" 
                }}>
                  INTELLIGENT LIVING FEATURES
                </div>
                
                {features.map((feature, index) => (
                  <div key={index} className="mb-24 opacity-90">
                    <h3 className="text-4xl md:text-5xl font-bold text-accent mb-6 tracking-wider" style={{ 
                      textShadow: "0 0 30px currentColor, 0 8px 40px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 1)",
                      letterSpacing: "0.1em"
                    }}>
                      {feature.title.toUpperCase()}
                    </h3>
                    <p className="text-xl md:text-2xl text-foreground/95 leading-relaxed max-w-3xl mx-auto font-light" style={{ 
                      textShadow: "0 6px 30px rgba(0, 0, 0, 1), 0 2px 15px rgba(0, 0, 0, 1)" 
                    }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
                
                <div className="text-3xl md:text-4xl font-light text-accent/90 mt-32 mb-[50vh] tracking-wide" style={{ 
                  textShadow: "0 0 35px currentColor, 0 8px 40px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 1)"
                }}>
                  Experience the future of intelligent living
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second video page - Scroll-controlled */}
      <div className="relative w-full" style={{ height: '150vh' }}>
        {/* Scroll-controlled video background - Sticky to viewport */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <video
            ref={video2Ref}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source
              src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/btcxkg/zenitram.mp4"
              type="video/mp4"
            />
          </video>
          
          {/* Removed dark overlay for better video visibility */}
          
          {/* Animated content */}
          <div className="relative z-20 flex h-full w-full items-center justify-center">
            <div className={`text-center transition-all duration-1500 ${
              video2TextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-6">
                <AnimatedText text="Welcome Home" variant="wave" />
              </h2>
              <p className="text-2xl md:text-3xl text-foreground/90">
                <AnimatedText text="The future of intelligent living" variant="dissolve" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final page - Company Info & Footer */}
      <div className="relative w-full min-h-screen bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          {/* Company Info Section */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <img
                src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
                alt="Zenitram Logo"
                className="h-32 w-32 md:h-40 md:w-40 mx-auto object-contain opacity-90"
              />
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-zinc-800 mb-6 tracking-tight">
              <AnimatedText text="Zenitram" variant="wave" />
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto mb-16">
              <AnimatedText text="Transforming houses into intelligent homes through cutting-edge automation technology." variant="dissolve" />
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <h3 className="text-2xl font-light text-zinc-800 mb-4">
                <AnimatedText text="Vision" variant="cut" />
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Creating seamless living experiences where technology anticipates your needs and adapts to your lifestyle.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-light text-zinc-800 mb-4">
                <AnimatedText text="Innovation" variant="cut" />
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Pioneering smart home solutions that combine elegance with intelligence for modern living spaces.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-light text-zinc-800 mb-4">
                <AnimatedText text="Excellence" variant="cut" />
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Delivering premium automation systems designed for reliability, security, and unparalleled user experience.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-light text-zinc-800 mb-8">
              <AnimatedText text="Get in Touch" variant="wave" />
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-zinc-600">
              <a href="mailto:info@zenitram.com" className="hover:text-accent transition-colors">
                info@zenitram.com
              </a>
              <span className="hidden md:inline text-zinc-400">|</span>
              <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                +1 (234) 567-890
              </a>
              <span className="hidden md:inline text-zinc-400">|</span>
              <span>San Francisco, CA</span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-300 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
              <div className="flex gap-8">
                <button onClick={() => scrollToSection(0)} className="hover:text-accent transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection(1)} className="hover:text-accent transition-colors">
                  Features
                </button>
                <button onClick={() => scrollToSection(5)} className="hover:text-accent transition-colors">
                  Contact
                </button>
              </div>
              <div className="text-center md:text-right">
                <p className="font-mono">© 2026 Zenitram. All rights reserved.</p>
                <p className="text-xs mt-1">Intelligent Living for Modern Homes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
