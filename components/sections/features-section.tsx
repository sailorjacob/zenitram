"use client"

import React from "react"
import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"

export function FeaturesSection() {
  const { ref, isVisible } = useReveal(0.3)

  const features = [
    {
      title: "Intelligent Lighting",
      description:
        "Adaptive lighting that responds to your circadian rhythm, adjusts color temperature throughout the day, and learns your preferences for personalized ambiance.",
    },
    {
      title: "Climate Control",
      description:
        "Precise temperature management with AI-powered learning, geofencing integration, and predictive adjustments based on weather patterns.",
    },
    {
      title: "Security Systems",
      description:
        "Advanced monitoring with real-time alerts, multi-point door and window sensors, integrated camera feeds, and automated response protocols.",
    },
    {
      title: "Audio Integration",
      description:
        "Whole-home audio distribution with room-by-room control, streaming services integration, and voice-activated command capabilities.",
    },
    {
      title: "Energy Management",
      description:
        "Real-time consumption monitoring, automated optimization, renewable energy integration, and detailed usage analytics for sustainability.",
    },
    {
      title: "Mobile Control",
      description:
        "Seamless app-based control from anywhere in the world with instant feedback, automation scheduling, and emergency override features.",
    },
  ]

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 md:grid-cols-3 md:gap-10 lg:gap-12">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`group grid min-h-0 gap-x-3 gap-y-1.5 transition-all duration-700 md:flex md:flex-col md:gap-x-0 md:gap-y-2 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{
              gridTemplateColumns: "auto 1fr",
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* Bullet aligned to first line of title (same row on mobile, above on desktop) */}
            <div
              className="flex flex-shrink-0 items-center pt-[0.3em] md:block md:pt-0"
              style={{ gridRow: "1 / 2" }}
              aria-hidden
            >
              <div className="h-2 w-2 rounded-full bg-accent md:mb-3" />
            </div>
            <div className="min-w-0" style={{ gridRow: "1 / 3", gridColumn: "2 / 3" }}>
              <h3 className="mb-1.5 font-sans text-base font-light leading-tight text-foreground sm:mb-2 sm:text-lg md:mb-3 md:text-xl lg:text-2xl">
                <span className="block">
                  <AnimatedText text={feature.title} variant="cut" />
                </span>
              </h3>
              <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm md:text-base">
                <AnimatedText text={feature.description} variant="dissolve" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
