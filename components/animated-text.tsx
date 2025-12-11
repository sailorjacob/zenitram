"use client"

import { useState, useEffect } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  variant?: "spin" | "dissolve" | "cut"
  shimmer?: boolean
}

export function AnimatedText({ text, className = "", delay = 0, variant = "spin", shimmer = false }: AnimatedTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [shimmerPosition, setShimmerPosition] = useState(-100)
  const characters = text.split("")

  // Auto-shimmer effect that runs periodically
  useEffect(() => {
    if (!shimmer) return
    
    const runShimmer = () => {
      setShimmerPosition(-100)
      const start = Date.now()
      const duration = 1500
      
      const animate = () => {
        const elapsed = Date.now() - start
        const progress = elapsed / duration
        
        if (progress < 1) {
          setShimmerPosition(-100 + (progress * 300))
          requestAnimationFrame(animate)
        } else {
          setShimmerPosition(-100)
        }
      }
      
      requestAnimationFrame(animate)
    }
    
    // Initial shimmer after a delay
    const initialTimeout = setTimeout(runShimmer, 1000 + delay)
    
    // Repeat shimmer every 4-6 seconds randomly
    const interval = setInterval(() => {
      runShimmer()
    }, 4000 + Math.random() * 2000)
    
    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [shimmer, delay])

  const getVariant = (index: number) => {
    if (variant === "spin") {
      return {
        animation: isHovered ? `spinCharacter 0.6s ease-out ${index * 30}ms` : "none",
      }
    } else if (variant === "dissolve") {
      return {
        animation: isHovered ? `dissolveCharacter 0.8s ease-out ${index * 40}ms` : "none",
      }
    } else if (variant === "cut") {
      return {
        animation: isHovered ? `cutCharacter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 25}ms` : "none",
      }
    }
  }

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "inline-block",
        position: "relative",
      }}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            transformOrigin: "center",
            ...getVariant(index),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      
      {/* Metallic shimmer overlay */}
      {shimmer && (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            background: `linear-gradient(
              120deg,
              transparent ${shimmerPosition}%,
              rgba(255, 255, 255, 0.1) ${shimmerPosition + 10}%,
              rgba(255, 255, 255, 0.4) ${shimmerPosition + 20}%,
              rgba(255, 255, 255, 0.1) ${shimmerPosition + 30}%,
              transparent ${shimmerPosition + 40}%
            )`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            mixBlendMode: "overlay",
          }}
        />
      )}

      <style jsx global>{`
        @keyframes spinCharacter {
          0% {
            transform: rotateY(0deg) rotateZ(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(180deg) rotateZ(180deg);
            opacity: 0.5;
          }
          100% {
            transform: rotateY(360deg) rotateZ(0deg);
            opacity: 1;
          }
        }

        @keyframes dissolveCharacter {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes cutCharacter {
          0% {
            transform: translateY(0px);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  )
}
