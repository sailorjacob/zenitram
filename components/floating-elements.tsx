"use client"

import { useEffect, useState, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  angle: number
  rotationSpeed: number
  type: "dot" | "ring" | "cross" | "diamond" | "line"
  delay: number
}

interface GuideLine {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  opacity: number
  dashOffset: number
  animationDuration: number
}

export function FloatingElements() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [guideLines, setGuideLines] = useState<GuideLine[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = []
    const types: Particle["type"][] = ["dot", "ring", "cross", "diamond", "line"]
    
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 12 + 4,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 20 + 10,
        angle: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)

    // Generate guide lines
    const newLines: GuideLine[] = []
    for (let i = 0; i < 8; i++) {
      newLines.push({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        opacity: Math.random() * 0.15 + 0.05,
        dashOffset: Math.random() * 100,
        animationDuration: Math.random() * 10 + 15,
      })
    }
    setGuideLines(newLines)
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
              className="rounded-full bg-accent/60 blur-[1px] animate-pulse-glow"
              style={{
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px rgba(200, 180, 150, 0.3)`,
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
              className="rounded-full border border-accent/30 animate-spin-slow"
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
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
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
              className="rotate-45 border border-accent/25 animate-pulse-glow"
              style={{
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
              }}
            />
          </div>
        )
      
      case "line":
        return (
          <div
            key={particle.id}
            className="absolute animate-float-drift"
            style={baseStyle}
          >
            <div
              className="bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-pulse-glow"
              style={{
                width: particle.size * 3,
                height: 1,
                opacity: particle.opacity,
                transform: `rotate(${particle.angle}deg)`,
              }}
            />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 animate-blob rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-1/4 top-1/4 h-1/2 w-1/2 animate-blob animation-delay-2000 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute -bottom-1/4 left-1/3 h-1/2 w-1/2 animate-blob animation-delay-4000 rounded-full bg-accent/5 blur-3xl" />

      {/* Scanning line effect */}
      <div className="absolute inset-0">
        <div className="animate-scan-horizontal absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="animate-scan-vertical absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      </div>

      {/* Corner crosshairs */}
      <div className="absolute left-8 top-24 opacity-20">
        <Crosshair size={60} />
      </div>
      <div className="absolute right-8 top-24 opacity-20">
        <Crosshair size={60} />
      </div>
      <div className="absolute bottom-8 left-8 opacity-20">
        <Crosshair size={60} />
      </div>
      <div className="absolute bottom-8 right-8 opacity-20">
        <Crosshair size={60} />
      </div>

      {/* Center rotating element */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="relative h-96 w-96">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/30" style={{ animationDuration: "60s" }} />
          <div className="absolute inset-8 animate-spin-slow rounded-full border border-dotted border-accent/20" style={{ animationDuration: "45s", animationDirection: "reverse" }} />
          <div className="absolute inset-16 animate-spin-slow rounded-full border border-accent/10" style={{ animationDuration: "30s" }} />
        </div>
      </div>

      {/* Floating particles */}
      {particles.map(renderParticle)}

      {/* Animated guide lines (SVG) */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(200, 180, 150, 0)" />
            <stop offset="50%" stopColor="rgba(200, 180, 150, 0.3)" />
            <stop offset="100%" stopColor="rgba(200, 180, 150, 0)" />
          </linearGradient>
        </defs>
        {guideLines.map((line) => (
          <line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="8 12"
            className="animate-dash"
            style={{
              opacity: line.opacity,
              animationDuration: `${line.animationDuration}s`,
            }}
          />
        ))}
        
        {/* Constellation dots connected by lines */}
        <g className="animate-pulse-glow" style={{ animationDuration: "4s" }}>
          <circle cx="15%" cy="30%" r="2" fill="rgba(200, 180, 150, 0.3)" />
          <circle cx="25%" cy="20%" r="1.5" fill="rgba(200, 180, 150, 0.2)" />
          <circle cx="20%" cy="40%" r="1" fill="rgba(200, 180, 150, 0.25)" />
          <line x1="15%" y1="30%" x2="25%" y2="20%" stroke="rgba(200, 180, 150, 0.1)" strokeWidth="0.5" />
          <line x1="15%" y1="30%" x2="20%" y2="40%" stroke="rgba(200, 180, 150, 0.1)" strokeWidth="0.5" />
        </g>
        
        <g className="animate-pulse-glow" style={{ animationDuration: "5s", animationDelay: "1s" }}>
          <circle cx="75%" cy="60%" r="2" fill="rgba(200, 180, 150, 0.3)" />
          <circle cx="85%" cy="50%" r="1.5" fill="rgba(200, 180, 150, 0.2)" />
          <circle cx="80%" cy="70%" r="1" fill="rgba(200, 180, 150, 0.25)" />
          <line x1="75%" y1="60%" x2="85%" y2="50%" stroke="rgba(200, 180, 150, 0.1)" strokeWidth="0.5" />
          <line x1="75%" y1="60%" x2="80%" y2="70%" stroke="rgba(200, 180, 150, 0.1)" strokeWidth="0.5" />
        </g>
      </svg>

      {/* Blueprint grid dots */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(200, 180, 150, 1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Subtle mouse follow glow */}
      <div
        className="pointer-events-none absolute h-64 w-64 rounded-full transition-all duration-1000 ease-out"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          background: "radial-gradient(circle, rgba(200, 180, 150, 0.03) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}

function Crosshair({ size = 40 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer ring */}
      <div 
        className="absolute inset-0 rounded-full border border-accent/30 animate-ping"
        style={{ animationDuration: "3s" }}
      />
      {/* Inner ring */}
      <div className="absolute inset-2 rounded-full border border-accent/20" />
      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40" />
      {/* Crosshair lines */}
      <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-accent/30" />
      <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-accent/30" />
      <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-accent/30" />
      <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-accent/30" />
      {/* Corner brackets */}
      <div className="absolute left-0 top-0 h-3 w-px bg-accent/20" />
      <div className="absolute left-0 top-0 h-px w-3 bg-accent/20" />
      <div className="absolute right-0 top-0 h-3 w-px bg-accent/20" />
      <div className="absolute right-0 top-0 h-px w-3 bg-accent/20" />
      <div className="absolute bottom-0 left-0 h-3 w-px bg-accent/20" />
      <div className="absolute bottom-0 left-0 h-px w-3 bg-accent/20" />
      <div className="absolute bottom-0 right-0 h-3 w-px bg-accent/20" />
      <div className="absolute bottom-0 right-0 h-px w-3 bg-accent/20" />
    </div>
  )
}
