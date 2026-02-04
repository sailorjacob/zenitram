"use client"

import { useEffect, useRef } from "react"

interface ShaderOrbsProps {
  count?: number
  colors?: string[]
}

export function ShaderOrbs({ count = 3, colors = ["#85754340", "#aa886630", "#99774420"] }: ShaderOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const orbs = containerRef.current.querySelectorAll(".shader-orb")
    orbs.forEach((orb, index) => {
      const element = orb as HTMLElement
      const delay = index * 2
      const duration = 20 + index * 5

      element.style.animationDelay = `${delay}s`
      element.style.animationDuration = `${duration}s`
    })
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="shader-orb absolute rounded-full blur-3xl"
          style={{
            width: `${300 + i * 100}px`,
            height: `${300 + i * 100}px`,
            background: colors[i % colors.length],
            left: `${10 + i * 30}%`,
            top: `${20 + i * 15}%`,
            animation: "float-orb 20s ease-in-out infinite",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-orb {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(30px, -40px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-20px, -60px) scale(0.9);
            opacity: 0.5;
          }
          75% {
            transform: translate(40px, -30px) scale(1.05);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
