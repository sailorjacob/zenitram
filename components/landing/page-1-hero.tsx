"use client"

import { useEffect, useRef, useState } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { GradientText } from "@/components/effects/gradient-text"
import { ParticleSystem } from "@/components/effects/particle-system"
import { ShaderOrbs } from "@/components/effects/shader-orbs"
import { ChevronDown } from "lucide-react"

interface Page1HeroProps {
  onContinue: () => void
}

export function Page1Hero({ onContinue }: Page1HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsVideoLoaded(true)
    video.addEventListener("loadeddata", handleLoadedData)

    return () => video.removeEventListener("loadeddata", handleLoadedData)
  }, [])

  return (
    <section className="page-dark relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-30" : "opacity-0"
          }`}
        >
          <source
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_seamlessly_looping_liquid_metal_iridescent_metallic_4bd03a20-53f5-4dfe-808a-ba93436796ba_3-vmake.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Particle System */}
      <ParticleSystem count={60} color="rgba(255, 255, 255, 0.4)" />

      {/* Shader Orbs */}
      <ShaderOrbs
        count={3}
        colors={["#85754330", "#aa886620", "#99774415"]}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Logo */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mx-auto h-32 w-32 md:h-40 md:w-40">
            <img
              src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/images/Zenitram%20logo.png"
              alt="Zenitram"
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-4 text-5xl font-light leading-tight tracking-tight duration-1000 delay-200 md:text-7xl lg:text-8xl">
          <GradientText
            gradient="linear-gradient(135deg, #ffffff 0%, #e0e0e0 25%, #ffffff 50%, #d0d0d0 75%, #ffffff 100%)"
            animate
          >
            The Future of
          </GradientText>
          <br />
          <GradientText
            gradient="linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)"
            animate
          >
            Intelligent Living
          </GradientText>
        </h1>

        {/* Subheadline */}
        <p className="mb-12 animate-in fade-in slide-in-from-bottom-4 text-xl font-light text-white/80 duration-1000 delay-300 md:text-2xl">
          Where technology meets intuition
        </p>

        {/* CTA Button */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <MagneticButton
            size="lg"
            variant="primary"
            onClick={onContinue}
            className="group relative overflow-hidden px-12 py-4 text-lg"
          >
            <span className="relative z-10">Enter</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-in fade-in duration-1000 delay-700">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-widest text-white/60">
            Scroll to explore
          </p>
          <ChevronDown className="h-5 w-5 animate-bounce text-white/60" />
        </div>
      </div>
    </section>
  )
}
