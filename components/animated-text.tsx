"use client"

import { useState, useEffect } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  variant?: "wave" | "dissolve" | "cut"
  shimmer?: boolean
}

export function AnimatedText({ text, className = "", delay = 0, variant = "wave", shimmer = false }: AnimatedTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [shimmerActive, setShimmerActive] = useState(false)
  const characters = text.split("")

  // Auto-shimmer effect that runs periodically
  useEffect(() => {
    if (!shimmer) return
    
    const runShimmer = () => {
      setShimmerActive(true)
      setTimeout(() => setShimmerActive(false), 1500)
    }
    
    // Initial shimmer after a delay
    const initialTimeout = setTimeout(runShimmer, 1500 + delay)
    
    // Repeat shimmer every 5-7 seconds randomly
    const interval = setInterval(() => {
      runShimmer()
    }, 5000 + Math.random() * 2000)
    
    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [shimmer, delay])

  const getVariant = (index: number) => {
    if (variant === "wave") {
      return {
        animation: isHovered ? `waveCharacter 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 40}ms` : "none",
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
            transformOrigin: "center bottom",
            ...getVariant(index),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      
      {/* Shimmer glare overlay */}
      {shimmer && (
        <span
          className={shimmerActive ? "shimmer-glare-active" : "shimmer-glare"}
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            background: "linear-gradient(120deg, transparent 0%, transparent 30%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 55%, transparent 70%, transparent 100%)",
            transform: "skewX(-20deg)",
          }}
        />
      )}

      <style jsx global>{`
        @keyframes waveCharacter {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateY(-8px) rotate(-2deg);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-4px) rotate(0deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-2px) rotate(1deg);
            opacity: 0.95;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes dissolveCharacter {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.95);
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
            transform: translateY(-12px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }
        
        @keyframes glareSwipe {
          0% {
            left: -100%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 200%;
            opacity: 0;
          }
        }
        
        .shimmer-glare {
          opacity: 0;
        }
        
        .shimmer-glare-active {
          animation: glareSwipe 1.5s ease-in-out forwards;
        }
      `}</style>
    </span>
  )
}
