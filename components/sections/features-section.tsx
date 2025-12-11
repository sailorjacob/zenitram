"use client"

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
    <div ref={ref} className="mx-auto w-full max-w-6xl">
      <div
        className={`mb-16 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
        }`}
      >
        <h2 className="mb-3 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl text-center">
          <span className="block">
            <AnimatedText text="Smart Features" variant="spin" />
          </span>
        </h2>
        <p className="font-mono text-xs text-foreground/60 md:text-sm text-center">
          <AnimatedText text="Essential capabilities for modern living" variant="dissolve" />
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`group transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
            </div>
            <h3 className="mb-3 font-sans text-xl font-light text-foreground md:text-2xl">
              <span className="block">
                <AnimatedText text={feature.title} variant="cut" />
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
              <AnimatedText text={feature.description} variant="dissolve" />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
