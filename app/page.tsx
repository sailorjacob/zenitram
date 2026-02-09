"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { MagneticButton } from "@/components/magnetic-button"
import { GradientText } from "@/components/effects/gradient-text"
import { ParticleSystem } from "@/components/effects/particle-system"
import { ShaderOrbs } from "@/components/effects/shader-orbs"
import { ChevronDown, Lightbulb, Thermometer, Lock, Music, Battery, Smartphone, Mail, Phone, MapPin } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const TOTAL_PAGES = 3

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

  const isDarkPage = currentPage === 0 || currentPage === 2

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden"
      style={{
        scrollSnapType: "y proximity",
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

      {/* ==================== PAGE 2: SERVICES ==================== */}
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black py-24"
        style={{
          scrollSnapAlign: "start",
        }}
      >
        {/* Full-width video background with dark overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          >
            <source src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_seamlessly_looping_liquid_metal_iridescent_metallic_8bd899ee-7749-4af1-8f34-a0eab5d90b9e_3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">
              What We Do
            </h2>
            <p className="text-lg text-white/60">Complete solutions for intelligent living</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm p-8 shadow-lg ring-1 ring-white/10 transition-all hover:shadow-xl hover:ring-white/20"
              >
                {/* Video background in card */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-100">
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
                <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-white/10">
                  <div className="h-full w-0 bg-white transition-all duration-500 group-hover:w-full" />
                </div>
                <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                  <service.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="relative z-10 mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="relative z-10 text-sm text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PAGE 3: CTA WITH MASKED VIDEOS ==================== */}
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
        style={{
          scrollSnapAlign: "start",
        }}
      >
        {/* Masked Video Background - visible on all devices */}
        <div className="absolute inset-0 flex items-center justify-center">
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
            {/* Dark vignette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.9) 100%)",
              }}
            />
          </div>
        </div>

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            See How It
            <br />
            <span className="text-[oklch(0.75_0.18_35)]">All Connects</span>
          </h2>

          <p className="mb-12 text-xl text-white/70 md:text-2xl">
            Experience intelligent living in action.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={goToExperience}
              className="border-0 px-12 py-4 text-lg"
              style={{ backgroundColor: "#fff", color: "#000" }}
            >
              Enter Experience
            </MagneticButton>
          </div>

          {/* Contact Info */}
          <div className="mt-16 flex flex-col items-center gap-4 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
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

          <p className="mt-8 font-mono text-xs text-white/40">
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
