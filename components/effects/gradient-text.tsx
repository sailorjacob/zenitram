"use client"

import { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  className?: string
  gradient?: string
  animate?: boolean
}

export function GradientText({
  children,
  className = "",
  gradient = "linear-gradient(135deg, #ffffff 0%, #a8a8a8 50%, #ffffff 100%)",
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${animate ? "animate-gradient" : ""} ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: animate ? "200% 100%" : "100% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </span>
  )
}
