"use client"

import { useEffect, useState, useMemo } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  angle: number
  type: "dot" | "ring" | "cross" | "diamond"
  delay: number
}

interface HeroFloatingElementsProps {
  isVisible: boolean
}

export function HeroFloatingElements({ isVisible }: HeroFloatingElementsProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Generate particles only once using useMemo
  const particles = useMemo(() => {
    const newParticles: Particle[] = []
    const types: Particle["type"][] = ["dot", "ring", "cross", "diamond"]
    
    // Reduced to 20 particles for better performance
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 3,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 15 + 12,
        angle: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
      })
    }
    return newParticles
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      animationDelay: `${particle.delay}s`,
      animationDuration: `${particle.speed}s`,
    }

    switch (particle.type) {
      case "dot":
        return (
          <div
            key={particle.id}
            className="absolute animate-float-drift"
            style={baseStyle}
          >
            <div
              className="rounded-full bg-accent/60 animate-pulse-glow"
              style={{
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px rgba(200, 180, 150, 0.2)`,
              }}
            />
          </div>
        )
      
      case "ring":
        return (
          <div
            key={particle.id}
            className="absolute animate-float-drift"
            style={baseStyle}
          >
            <div
              className="rounded-full border border-accent/25 animate-spin-slow"
              style={{
                width: particle.size * 2,
                height: particle.size * 2,
                opacity: particle.opacity,
                animationDuration: `${20 + particle.speed}s`,
              }}
            />
          </div>
        )
      
      case "cross":
        return (
          <div
            key={particle.id}
            className="absolute animate-float-drift"
            style={baseStyle}
          >
            <div
              className="relative animate-spin-slow"
              style={{
                width: particle.size * 1.5,
                height: particle.size * 1.5,
                opacity: particle.opacity,
                animationDuration: `${30 + particle.speed}s`,
              }}
            >
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
          </div>
        )
      
      case "diamond":
        return (
          <div
            key={particle.id}
            className="absolute animate-float-drift"
            style={baseStyle}
          >
            <div
              className="rotate-45 border border-accent/20 animate-pulse-glow"
              style={{
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
              }}
            />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div 
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Subtle animated gradient orbs */}
      <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 animate-blob rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-1/4 top-1/4 h-1/2 w-1/2 animate-blob animation-delay-2000 rounded-full bg-secondary/5 blur-3xl" />

      {/* Center rotating element */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <div className="relative h-80 w-80 md:h-96 md:w-96">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/30" style={{ animationDuration: "60s" }} />
          <div className="absolute inset-8 animate-spin-slow rounded-full border border-dotted border-accent/20" style={{ animationDuration: "45s", animationDirection: "reverse" }} />
          <div className="absolute inset-16 animate-spin-slow rounded-full border border-accent/10" style={{ animationDuration: "30s" }} />
        </div>
      </div>

      {/* Corner crosshairs - hidden on mobile */}
      <div className="hidden md:block absolute left-8 top-24 opacity-15">
        <Crosshair size={50} />
      </div>
      <div className="hidden md:block absolute right-8 top-24 opacity-15">
        <Crosshair size={50} />
      </div>
      <div className="hidden md:block absolute bottom-20 left-8 opacity-15">
        <Crosshair size={50} />
      </div>
      <div className="hidden md:block absolute bottom-20 right-8 opacity-15">
        <Crosshair size={50} />
      </div>

      {/* Floating particles */}
      {particles.map(renderParticle)}

      {/* Blueprint grid dots - very subtle */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(200, 180, 150, 1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Subtle mouse follow glow */}
      <div
        className="pointer-events-none absolute h-48 w-48 md:h-64 md:w-64 rounded-full transition-all duration-1000 ease-out"
        style={{
          left: mousePos.x - 96,
          top: mousePos.y - 96,
          background: "radial-gradient(circle, rgba(200, 180, 150, 0.02) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}

function Crosshair({ size = 40 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer ring with subtle ping */}
      <div 
        className="absolute inset-0 rounded-full border border-accent/25 animate-ping"
        style={{ animationDuration: "4s" }}
      />
      {/* Inner ring */}
      <div className="absolute inset-2 rounded-full border border-accent/15" />
      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30" />
      {/* Crosshair lines */}
      <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-accent/20" />
      <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-accent/20" />
      <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-accent/20" />
      <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-accent/20" />
    </div>
  )
}
