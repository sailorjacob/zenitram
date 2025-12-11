"use client"

import { useState, useEffect, useMemo } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  variant?: "wave" | "dissolve" | "cut"
  shimmer?: boolean
  shimmerSpeed?: "fast" | "normal" | "slow"
}

export function AnimatedText({ 
  text, 
  className = "", 
  delay = 0, 
  variant = "wave", 
  shimmer = false,
  shimmerSpeed = "normal"
}: AnimatedTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [shimmerActive, setShimmerActive] = useState(false)
  const [shimmerKey, setShimmerKey] = useState(0)
  const characters = text.split("")

  // Generate consistent random variations based on text
  const shimmerVariation = useMemo(() => {
    const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return {
      width: 80 + (hash % 40), // 80-120%
      skew: 15 + (hash % 15),  // 15-30 degrees
      interval: 4000 + (hash % 4000), // 4-8 seconds
    }
  }, [text])

  // Speed presets
  const speedConfig = {
    fast: { duration: 0.8, interval: 3000 },
    normal: { duration: 1.2, interval: shimmerVariation.interval },
    slow: { duration: 1.8, interval: 6000 },
  }

  const config = speedConfig[shimmerSpeed]

  // Auto-shimmer effect that runs periodically
  useEffect(() => {
    if (!shimmer) return
    
    const runShimmer = () => {
      setShimmerKey(k => k + 1)
      setShimmerActive(true)
      setTimeout(() => setShimmerActive(false), config.duration * 1000 + 200)
    }
    
    // Initial shimmer after a delay
    const initialTimeout = setTimeout(runShimmer, 1500 + delay)
    
    // Repeat shimmer with variation
    const interval = setInterval(() => {
      runShimmer()
    }, config.interval + Math.random() * 2000)
    
    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [shimmer, delay, config.duration, config.interval])

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
        overflow: "hidden",
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
      
      {/* Shimmer glare overlay - thin streak */}
      {shimmer && (
        <span
          key={shimmerKey}
          style={{
            position: "absolute",
            top: "0",
            left: shimmerActive ? undefined : "-100%",
            width: "25%",
            height: "100%",
            pointerEvents: "none",
            background: `linear-gradient(
              90deg, 
              transparent 0%,
              rgba(255,255,255,0.05) 20%,
              rgba(255,255,255,0.2) 40%,
              rgba(255,255,255,0.5) 50%,
              rgba(255,255,255,0.2) 60%,
              rgba(255,255,255,0.05) 80%,
              transparent 100%
            )`,
            transform: `skewX(-${shimmerVariation.skew}deg)`,
            animation: shimmerActive 
              ? `glareSwipe ${config.duration}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`
              : "none",
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
          5% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          95% {
            opacity: 0.5;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </span>
  )
}

