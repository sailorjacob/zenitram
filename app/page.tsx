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

type ThemeAccent = "sand" | "emerald" | "sapphire"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [themeAccent, setThemeAccent] = useState<ThemeAccent>("sand")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Apply theme accent to CSS custom property
  useEffect(() => {
    const root = document.documentElement
    const themes = {
      sand: "oklch(0.85 0.12 50)",      // Current warm sand/orange
      emerald: "oklch(0.7 0.18 160)",   // Cool emerald green
      sapphire: "oklch(0.65 0.2 250)",  // Deep sapphire blue
    }
    root.style.setProperty("--accent", themes[themeAccent])
  }, [themeAccent])

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
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
        
        updateScrollProgress()
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

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [currentSection, updateScrollProgress])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Dream video background with circular portal effect */}
      <DreamVideoBackground scrollProgress={scrollProgress} currentSection={currentSection} />
      
      <div className="fixed inset-0 z-[1] pointer-events-none">
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
        className={`fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-4 transition-opacity duration-700 md:px-12 md:py-6 ${isLoaded ? "opacity-100" : "opacity-0"}`}
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
          {/* Theme color switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeAccent("sand")}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                themeAccent === "sand" 
                  ? "border-2 border-white/80 bg-transparent" 
                  : "border border-white/30 hover:border-white/60"
              }`}
              style={{ 
                backgroundColor: themeAccent === "sand" ? "transparent" : "oklch(0.85 0.12 50)",
                boxShadow: themeAccent === "sand" ? "inset 0 0 0 4px oklch(0.85 0.12 50)" : "none"
              }}
              title="Sand accent"
            />
            <button
              onClick={() => setThemeAccent("emerald")}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                themeAccent === "emerald" 
                  ? "border-2 border-white/80 bg-transparent" 
                  : "border border-white/30 hover:border-white/60"
              }`}
              style={{ 
                backgroundColor: themeAccent === "emerald" ? "transparent" : "oklch(0.7 0.18 160)",
                boxShadow: themeAccent === "emerald" ? "inset 0 0 0 4px oklch(0.7 0.18 160)" : "none"
              }}
              title="Emerald accent"
            />
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
        <section className="relative flex h-screen w-screen shrink-0 flex-col items-center justify-center px-6 py-24 md:px-12">
          <div className="max-w-4xl relative z-10 w-full">
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-tight tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl text-center">
              <span className="block">
                <AnimatedText text="Intelligent Living" variant="spin" shimmer />
              </span>
              <span className="block">
                <AnimatedText text="for Modern Homes" variant="cut" shimmer />
              </span>
            </h1>
            <p className="mb-8 mx-auto animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-lg text-center max-w-2xl">
              Transform your space with seamless automation. Control lighting, climate, security, and entertainment from
              anywhere. Designed for elegance, built for intelligence.
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center justify-center">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)}>
                <AnimatedText text="Explore Features" variant="wave" />
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(4)}>
                <AnimatedText text="See Demo" variant="wave" />
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500 z-20">
            <p className="font-mono text-xs text-foreground/40">© 2026 Zenitram</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-center px-6 md:px-12 lg:px-16">
          <FeaturesSection />
        </section>

        {/* Solutions Section */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-center px-6 md:px-12 lg:px-16">
          <SolutionsSection />
        </section>

        {/* Technology Section */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-center px-6 md:px-12 lg:px-16">
          <TechnologySection />
        </section>

        {/* Showcase Section */}
        <section className="relative flex h-screen w-screen shrink-0 snap-start items-center px-6 md:px-12 lg:px-16">
          <ShowcaseSection />
        </section>

        {/* Contact Section */}
        <section className="relative flex h-screen w-screen shrink-0 items-center px-4 md:px-12 lg:px-16">
          <ContactSection scrollToSection={scrollToSection} />
        </section>
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
