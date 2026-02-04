"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { MagneticButton } from "@/components/magnetic-button"
import { GradientText } from "@/components/effects/gradient-text"
import { ParticleSystem } from "@/components/effects/particle-system"
import { ShaderOrbs } from "@/components/effects/shader-orbs"
import { BlueprintGrid } from "@/components/landing/blueprint-grid"
import { AnimatedText } from "@/components/animated-text"
import { ChevronDown, Zap, Shield, Cpu, Lightbulb, Thermometer, Lock, Music, Battery, Smartphone, Mail, Phone, MapPin, Check, X } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [galaxyProgress, setGalaxyProgress] = useState(0)
  const [showGalaxy, setShowGalaxy] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<"physical" | "cognitive">("physical")

  const TOTAL_PAGES = 5

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle scroll to update current page
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollTop = containerRef.current.scrollTop
      const pageHeight = window.innerHeight
      const page = Math.round(scrollTop / pageHeight)
      setCurrentPage(Math.min(page, TOTAL_PAGES - 1))

      // Galaxy transition between pages 3 and 4
      const page4Start = pageHeight * 3
      const page5Start = pageHeight * 4
      const galaxyTransitionStart = page4Start + pageHeight * 0.3
      const galaxyTransitionEnd = page5Start

      if (scrollTop >= galaxyTransitionStart && scrollTop <= galaxyTransitionEnd) {
        setShowGalaxy(true)
        const progress = (scrollTop - galaxyTransitionStart) / (galaxyTransitionEnd - galaxyTransitionStart)
        setGalaxyProgress(Math.max(0, Math.min(1, progress)))
      } else {
        setShowGalaxy(false)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }
    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToPage = useCallback((pageIndex: number) => {
    if (!containerRef.current) return
    const pageHeight = window.innerHeight
    containerRef.current.scrollTo({
      top: pageIndex * pageHeight,
      behavior: "smooth",
    })
  }, [])

  const goToExperience = useCallback(() => {
    router.push("/experience")
  }, [router])

  const services = [
    { id: "automation", icon: Lightbulb, title: "Smart Automation", description: "Intelligent lighting control" },
    { id: "climate", icon: Thermometer, title: "Climate Control", description: "Precision temperature" },
    { id: "security", icon: Lock, title: "Security Systems", description: "Advanced protection" },
    { id: "audio", icon: Music, title: "Audio Integration", description: "Whole-home sound" },
    { id: "energy", icon: Battery, title: "Energy Management", description: "Power optimization" },
    { id: "mobile", icon: Smartphone, title: "Mobile Control", description: "Remote access" },
  ]

  const isDarkPage = currentPage === 0 || currentPage === 3

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden"
      style={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* Landing Header */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 md:py-6">
          <div className="h-16 w-16 md:h-20 md:w-20">
            <img
              src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
              alt="Zenitram"
              className="h-full w-full object-contain"
            />
          </div>
          <MagneticButton
            variant={isDarkPage ? "secondary" : "primary"}
            onClick={goToExperience}
            className={isDarkPage ? "text-white border-white/20" : ""}
          >
            Skip to Experience
          </MagneticButton>
        </nav>
      </header>

      {/* Progress Indicator */}
      <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 md:right-8">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentPage === i
                ? "scale-125 bg-accent"
                : isDarkPage
                ? "bg-white/30 hover:bg-white/50"
                : "bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* Galaxy Transition Overlay - only show between pages 3-4, hide on page 5 */}
      {showGalaxy && currentPage < 4 && (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="relative h-[50vh] w-[50vh] max-h-[400px] max-w-[400px] md:h-[70vh] md:w-[70vh] md:max-h-[600px] md:max-w-[600px]"
            style={{
              animation: "spin 60s linear infinite",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover rounded-full"
              style={{
                opacity: 1 - galaxyProgress,
                mixBlendMode: "screen",
              }}
            >
              <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_spinning_galaxy_of_icons_for_home_automation_follow_057e0f0f-7a12-46b6-9100-40f65376e030_0.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover rounded-full"
              style={{
                opacity: galaxyProgress,
                mixBlendMode: "screen",
              }}
            >
              <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_spinning_galaxy_of_icons_for_home_automation_follow_564b0fea-c18a-481e-961e-c0c661e88feb_0.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* ==================== PAGE 1: DARK HERO ==================== */}
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
        style={{ scrollSnapAlign: "start" }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_seamlessly_looping_liquid_metal_iridescent_metallic_4bd03a20-53f5-4dfe-808a-ba93436796ba_3-vmake.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

        <ParticleSystem count={50} color="rgba(255, 255, 255, 0.5)" />
        <ShaderOrbs count={3} colors={["#85754325", "#aa886620", "#99774415"]} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="mx-auto h-28 w-28 md:h-36 md:w-36">
              <img
                src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
                alt="Zenitram"
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-4 text-5xl font-bold leading-tight tracking-tight duration-1000 delay-200 md:text-7xl lg:text-8xl">
            <GradientText gradient="linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)" animate>
              The Future of
            </GradientText>
            <br />
            <GradientText gradient="linear-gradient(135deg, #ffffff 0%, #d0d0d0 50%, #ffffff 100%)" animate>
              Intelligent Living
            </GradientText>
          </h1>

          <p className="mb-10 animate-in fade-in slide-in-from-bottom-4 text-xl font-light text-white/80 duration-1000 delay-300 md:text-2xl">
            Where technology meets intuition
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={() => scrollToPage(1)}
              className="px-12 py-4 text-lg"
            >
              Enter
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-in fade-in duration-1000 delay-700">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-widest text-white/50">Scroll</p>
            <ChevronDown className="h-5 w-5 animate-bounce text-white/50" />
          </div>
        </div>
      </section>

      {/* ==================== PAGE 2: LIGHT PHILOSOPHY ==================== */}
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fafafa] py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "linear-gradient(0deg, transparent 24%, #000 25%, #000 26%, transparent 27%), linear-gradient(90deg, transparent 24%, #000 25%, #000 26%, transparent 27%)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-5xl font-bold tracking-tight text-black md:text-7xl lg:text-8xl">
              Built for Tomorrow
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/60 md:text-xl">
              Technology that anticipates, adapts, and enhances every moment.
            </p>
          </div>

          <div className="mb-20 grid gap-8 md:grid-cols-3">
            {[
              { icon: Zap, title: "Intuitive", desc: "Systems that understand you" },
              { icon: Shield, title: "Secure", desc: "Enterprise-grade protection" },
              { icon: Cpu, title: "Intelligent", desc: "AI that grows with you" },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-3xl bg-white p-10 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black transition-transform group-hover:scale-110">
                  <item.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-black">{item.title}</h3>
                <p className="text-black/60">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Partners */}
          <div className="hidden text-center">
            <p className="mb-8 text-sm font-medium uppercase tracking-wider text-black/40">
              Trusted by leading homes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
              {["Google", "Apple", "Amazon", "Tesla"].map((name) => (
                <span key={name} className="text-2xl font-bold text-black">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PAGE 3: LIGHT SERVICES ==================== */}
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-24"
        style={{
          scrollSnapAlign: "start",
          background: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
        }}
      >
        {/* Left side masked video background */}
        <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_seamlessly_looping_liquid_metal_iridescent_metallic_8bd899ee-7749-4af1-8f34-a0eab5d90b9e_3.mp4" type="video/mp4" />
          </video>
          {/* Fade mask from left to right */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(248,248,248,0.7) 0%, rgba(248,248,248,0.9) 50%, #f8f8f8 100%)"
            }}
          />
        </div>

        <BlueprintGrid variant="lines" color="oklch(0.3 0 0)" opacity={0.03} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-black md:text-7xl">
              What We Do
            </h2>
            <p className="text-lg text-black/60">Complete solutions for intelligent living</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm p-8 text-left shadow-sm ring-1 ring-black/10 transition-all hover:shadow-xl hover:ring-black/20"
              >
                {/* Video background in card */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src={[
                      "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/1123.mp4",
                      "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/112.mp4",
                      "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/1234.mp4"
                    ][index % 3]} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-black/5">
                  <div className="h-full w-0 bg-black transition-all duration-500 group-hover:w-full" />
                </div>
                <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-black/5 transition-colors group-hover:bg-white/20">
                  <service.icon className="h-7 w-7 text-black/70 transition-colors group-hover:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="relative z-10 mb-2 text-xl font-bold text-black transition-colors group-hover:text-white">{service.title}</h3>
                <p className="relative z-10 text-sm text-black/60 transition-colors group-hover:text-white/70">{service.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Service Modal with Video Background */}
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setSelectedService(null)}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
            <div className="relative z-10 mx-4 w-full max-w-3xl rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Video Background Grid */}
              <div className="absolute inset-0 grid grid-cols-3">
                <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-30">
                  <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/1123.mp4" type="video/mp4" />
                </video>
                <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-30">
                  <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/112.mp4" type="video/mp4" />
                </video>
                <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-30">
                  <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/1234.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Vignette overlay */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 70%)" }} />
              <div className="relative p-12">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                  {services.find((s) => s.id === selectedService)?.title}
                </h2>
                <p className="text-lg text-white/80 md:text-xl">
                  Advanced {services.find((s) => s.id === selectedService)?.description.toLowerCase()} solutions designed for modern intelligent homes.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================== PAGE 4: DARK TECHNOLOGY ==================== */}
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <BlueprintGrid variant="lines" color="oklch(0.55 0.22 260)" opacity={0.06} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">
              Powered by Intelligence
            </h2>
            <p className="text-lg text-white/60">Modular architecture that adapts and improves</p>
          </div>

          {/* Toggle */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex rounded-full bg-white/5 p-1 backdrop-blur-xl">
              <button
                onClick={() => setActiveView("physical")}
                className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                  activeView === "physical" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Physical
              </button>
              <button
                onClick={() => setActiveView("cognitive")}
                className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                  activeView === "cognitive" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Cognitive
              </button>
            </div>
          </div>

          {/* Specs */}
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: "Response", value: "<50ms" },
              { label: "Uptime", value: "99.9%" },
              { label: "Devices", value: "500+" },
              { label: "Efficiency", value: "+40%" },
            ].map((spec, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[oklch(0.55_0.22_260)] to-transparent opacity-50" />
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-white/50">{spec.label}</p>
                <p className="text-4xl font-bold text-white">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PAGE 5: LIGHT CTA WITH MASKED VIDEOS ==================== */}
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white"
        style={{
          scrollSnapAlign: "start",
        }}
      >
        {/* Masked Video Background - hidden on mobile for performance */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center">
          {/* Video grid with masking */}
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-3 gap-0">
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
            {/* Radial vignette - shows center */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.95) 60%, #ffffff 80%)",
              }}
            />
          </div>
        </div>

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="mb-6 text-5xl font-bold tracking-tight text-black md:text-7xl lg:text-8xl">
            See How It
            <br />
            <span className="text-[oklch(0.65_0.18_35)]">All Connects</span>
          </h2>

          <p className="mb-12 text-xl text-black/60 md:text-2xl">
            Experience intelligent living in action.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={goToExperience}
              className="border-0 px-12 py-4 text-lg"
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              Enter Experience
            </MagneticButton>
          </div>

          {/* Contact Info */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-black/50">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              info@zenitram.io
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +1 (829) 576-0844
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Miami • Santo Domingo
            </div>
          </div>

          <p className="mt-8 font-mono text-xs text-black/30">
            © 2026 Zenitram. All rights reserved.
          </p>
        </div>
      </section>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
