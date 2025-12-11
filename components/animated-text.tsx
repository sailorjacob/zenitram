"use client"

import { useState } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  variant?: "spin" | "dissolve" | "cut"
}

export function AnimatedText({ text, className = "", delay = 0, variant = "spin" }: AnimatedTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const characters = text.split("")

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
