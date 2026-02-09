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

export default function ExperiencePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const verticalScrollRef = useRef<HTMLDivElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
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
    
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
      
      const handleResize = () => setWindowHeight(window.innerHeight)
      window.addEventListener('resize', handleResize)
      
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.load()
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--accent", THEME_COLORS[themeAccent].color)
  }, [themeAccent])

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

  // Debounce helper for performance
  const debounceRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current || !verticalScrollRef.current || typeof window === 'undefined') return

      const sectionWidth = scrollContainerRef.current.offsetWidth
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      const isAtEnd = scrollLeft >= maxScroll - 10
      
      const verticalScroll = verticalScrollRef.current.scrollTop
      const currentWindowHeight = window.innerHeight
      const isVideoPageVisible = verticalScroll > currentWindowHeight * 0.3
      
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (isAtEnd && e.deltaY > 0 && !isVideoPageVisible) {
          e.preventDefault()
          
          const scrollAmount = Math.min(Math.abs(e.deltaY), 100)
          verticalScrollRef.current.scrollBy({
            top: scrollAmount,
            behavior: "instant",
          })
          setIsOnVideoPage(verticalScrollRef.current.scrollTop > currentWindowHeight * 0.5)
          return
        }
        
        if (verticalScroll > 0 && isAtEnd) {
          e.preventDefault()
          
          if (e.deltaY < 0) {
            if (verticalScroll - Math.abs(e.deltaY) <= 0) {
              verticalScrollRef.current.scrollTo({
                top: 0,
                behavior: "instant",
              })
              setIsOnVideoPage(false)
            } else {
              const scrollAmount = Math.max(e.deltaY, -100)
              verticalScrollRef.current.scrollBy({
                top: scrollAmount,
                behavior: "instant",
              })
              setIsOnVideoPage(verticalScrollRef.current.scrollTop > currentWindowHeight * 0.5)
            }
          } else {
            // Allow free scrolling down - no lock
            const scrollAmount = Math.min(e.deltaY, 100)
            verticalScrollRef.current.scrollBy({
              top: scrollAmount,
              behavior: "instant",
            })
          }
          return
        }

        if (!isVideoPageVisible) {
          e.preventDefault()
          scrollContainerRef.current.scrollBy({
            left: e.deltaY,
            behavior: "instant",
          })

          // Use RAF for smoother updates
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => {
            if (!scrollContainerRef.current) return
            const newScrollLeft = scrollContainerRef.current.scrollLeft
            const newSection = Math.round(newScrollLeft / sectionWidth)
            if (newSection !== currentSection) {
              setCurrentSection(newSection)
            }
            updateScrollProgress()
          })
        }
      }
    }

    const handleScroll = () => {
      // Debounce scroll updates for performance
      if (debounceRef.current) cancelAnimationFrame(debounceRef.current)
      debounceRef.current = requestAnimationFrame(() => {
        updateScrollProgress()
        
        if (!scrollContainerRef.current) return
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)
        
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      })
    }

    const handleVerticalScroll = () => {
      if (!verticalScrollRef.current || !scrollContainerRef.current || typeof window === 'undefined') return
      
      // Use RAF for smooth vertical scroll handling
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!verticalScrollRef.current || !scrollContainerRef.current) return
        
        let verticalScroll = verticalScrollRef.current.scrollTop
        
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
        const isAtEnd = scrollLeft >= maxScroll - 50
        
        if (!isAtEnd && verticalScroll > 0) {
          verticalScrollRef.current.scrollTop = 0
          return
        }
        
        const currentWindowHeight = window.innerHeight
        setIsOnVideoPage(verticalScroll > currentWindowHeight * 0.3)
        
        // Only do video scrubbing on mobile (where the Star Wars effect is shown)
        const isMobile = window.innerWidth < 768
        const video1Start = currentWindowHeight
        const video1End = currentWindowHeight * 2.5
        
        if (isMobile && video1Ref.current && verticalScroll >= video1Start && verticalScroll <= video1End) {
          const video1Progress = Math.min(1, Math.max(0, (verticalScroll - video1Start) / (video1End - video1Start)))
          const video1Time = video1Progress * video1Ref.current.duration
          if (!isNaN(video1Time) && video1Ref.current.duration > 0) {
            video1Ref.current.currentTime = Math.min(video1Time, video1Ref.current.duration - 0.001)
          }
        }
        
        setVerticalScrollPosition(verticalScroll)
      })
    }

    const container = scrollContainerRef.current
    const verticalContainer = verticalScrollRef.current
    
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
      
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      const isAtEnd = scrollLeft >= maxScroll - 50
      const verticalScroll = verticalScrollRef.current.scrollTop
      
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
      if (debounceRef.current) cancelAnimationFrame(debounceRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [currentSection, updateScrollProgress, video1Complete])

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
        <a
          href="/"
          className="flex items-center transition-transform hover:scale-110 flex-shrink-0"
        >
          <div className="relative h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32">
            <img
              src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
              alt="Zenitram Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </a>

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
          {/* Left-side decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 top-1/4 h-[600px] w-[600px] animate-blob rounded-full bg-accent/8 blur-3xl" />
            <div className="absolute left-0 top-1/2 h-[500px] w-[500px] animate-blob animation-delay-2000 rounded-full bg-accent/6 blur-3xl" />
            <div className="absolute -left-20 bottom-1/4 h-[550px] w-[550px] animate-blob animation-delay-4000 rounded-full bg-accent/7 blur-3xl" />
            
            <div className="absolute left-24 top-1/3 opacity-[0.12]">
              <div className="relative h-96 w-96">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-accent/50" style={{ animationDuration: "45s" }} />
                <div className="absolute inset-12 animate-spin-slow rounded-full border-2 border-dotted border-accent/40" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
                <div className="absolute inset-24 animate-spin-slow rounded-full border border-accent/30" style={{ animationDuration: "60s" }} />
              </div>
            </div>
            
            <div className="absolute left-32 bottom-1/4 opacity-[0.1]">
              <div className="relative h-80 w-80">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-accent/45" style={{ animationDuration: "55s", animationDirection: "reverse" }} />
                <div className="absolute inset-16 animate-spin-slow rounded-full border border-dashed border-accent/35" style={{ animationDuration: "40s" }} />
              </div>
            </div>
            
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

        {/* Features Section */}
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

      {/* Video page - Desktop: Simple autoplay video with text overlay, Mobile: Scroll-controlled Star Wars effect */}
      
      {/* DESKTOP VERSION - Simple clean video with overlay */}
      <div className="relative w-full h-screen hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/btcxkg/sides2721_Create_a_website_image_asset_for_this_type_of_websi_1132009b-bf1e-4a5c-996b-2905acebeaba_1.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-8">
            <h2 className="text-7xl font-bold text-accent mb-8 tracking-widest" style={{ 
              textShadow: "0 0 40px currentColor, 0 0 80px currentColor",
              letterSpacing: "0.2em"
            }}>
              ZENITRAM
            </h2>
            <p className="text-2xl text-white/80 max-w-2xl mx-auto">
              Intelligent Living for Modern Homes
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION - Scroll-controlled Star Wars effect */}
      <div className="relative w-full md:hidden" style={{ height: '150vh' }}>
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
                <h2 className="text-5xl font-bold text-accent mb-16 tracking-widest animate-pulse" style={{ 
                  textShadow: "0 0 40px currentColor, 0 0 80px currentColor, 0 8px 40px rgba(0, 0, 0, 1)",
                  letterSpacing: "0.15em"
                }}>
                  ZENITRAM
                </h2>
                
                {features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="mb-20 opacity-90">
                    <h3 className="text-3xl font-bold text-accent mb-4 tracking-wider" style={{ 
                      textShadow: "0 0 30px currentColor, 0 8px 40px rgba(0, 0, 0, 1)",
                      letterSpacing: "0.1em"
                    }}>
                      {feature.title.toUpperCase()}
                    </h3>
                    <p className="text-lg text-foreground/95 leading-relaxed max-w-xl mx-auto font-light" style={{ 
                      textShadow: "0 4px 20px rgba(0, 0, 0, 1)" 
                    }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
                
                <div className="text-2xl font-light text-accent/90 mt-24 mb-[40vh] tracking-wide" style={{ 
                  textShadow: "0 0 35px currentColor, 0 8px 40px rgba(0, 0, 0, 1)"
                }}>
                  Experience the future
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final page - Company Info & Footer with Masked Video Background */}
      <div className="relative w-full min-h-screen overflow-visible pb-20">
        {/* Video Background with Vignette Mask - hidden on mobile for performance */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute inset-0 grid grid-cols-3">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover">
              <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/1123.mp4" type="video/mp4" />
            </video>
            <video autoPlay loop muted playsInline className="h-full w-full object-cover">
              <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/112.mp4" type="video/mp4" />
            </video>
            <video autoPlay loop muted playsInline className="h-full w-full object-cover">
              <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/1234.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Radial vignette - fades to show center */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(250,250,250,0.85) 0%, rgba(245,245,245,0.92) 30%, rgba(240,240,240,0.97) 60%, #f0f0f0 100%)"
            }}
          />
        </div>
        
        {/* Mobile background - simple gradient */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-zinc-100 to-zinc-200" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-32">
          <div className="text-center mb-20">
            <div className="mb-8">
              <img
                src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
                alt="Zenitram Logo"
                className="h-32 w-32 md:h-40 md:w-40 mx-auto object-contain"
              />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight">
              Zenitram
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto">
              Intelligent homes. Seamless living.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Vision</h3>
              <p className="text-zinc-600">Technology that anticipates your needs.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Innovation</h3>
              <p className="text-zinc-600">Elegance meets intelligence.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Excellence</h3>
              <p className="text-zinc-600">Premium automation systems.</p>
            </div>
          </div>

          <div className="text-center mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-zinc-700">
              <a href="mailto:info@zenitram.io" className="hover:text-black transition-colors font-medium">
                info@zenitram.io
              </a>
              <span className="hidden md:inline text-zinc-400">|</span>
              <a href="tel:+18295760844" className="hover:text-black transition-colors font-medium">
                +1 (829) 576-0844
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-zinc-600 mt-4">
              <span>Miami, FL</span>
              <span className="hidden md:inline text-zinc-400">•</span>
              <span>Santo Domingo, DR</span>
            </div>
          </div>

          <div className="border-t border-zinc-300/50 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
              <div className="flex gap-8">
                <a href="/" className="hover:text-black transition-colors">Home</a>
                <button onClick={() => scrollToSection(1)} className="hover:text-black transition-colors">Features</button>
                <button onClick={() => scrollToSection(5)} className="hover:text-black transition-colors">Contact</button>
              </div>
              <p className="font-mono">© 2026 Zenitram</p>
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
