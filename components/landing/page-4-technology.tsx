"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"
import { IsometricLayers } from "@/components/effects/isometric-layers"
import { BlueprintGrid } from "./blueprint-grid"

export function Page4Technology() {
  const { ref, isVisible } = useReveal(0.2)
  const [activeView, setActiveView] = useState<"physical" | "cognitive">("physical")

  const specs = [
    { label: "Response Time", value: "< 50ms" },
    { label: "Uptime", value: "99.9%" },
    { label: "Devices Supported", value: "500+" },
    { label: "Energy Efficiency", value: "+40%" },
  ]

  return (
    <section
      ref={ref}
      className="page-dark relative flex min-h-screen w-full items-center justify-center overflow-hidden py-24"
    >
      {/* Technical Grid Background */}
      <BlueprintGrid variant="lines" color="oklch(0.55 0.22 260)" opacity={0.08} />

      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.55_0.22_260)]/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-5xl font-light tracking-tight text-white md:text-7xl">
            <AnimatedText text="Powered by Intelligence" variant="wave" />
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            A modular architecture that analyzes, adapts, and improves continuously
          </p>
        </div>

        {/* Toggle */}
        <div
          className={`mb-12 flex justify-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="inline-flex rounded-full bg-white/5 p-1 backdrop-blur-xl">
            <button
              onClick={() => setActiveView("physical")}
              className={`rounded-full px-8 py-3 text-sm font-medium transition-all ${
                activeView === "physical"
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Physical
            </button>
            <button
              onClick={() => setActiveView("cognitive")}
              className={`rounded-full px-8 py-3 text-sm font-medium transition-all ${
                activeView === "cognitive"
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Cognitive
            </button>
          </div>
        </div>

        {/* Isometric Architecture */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <IsometricLayers activeView={activeView} />
        </div>

        {/* Technical Specs */}
        <div
          className={`grid gap-6 md:grid-cols-4 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {specs.map((spec, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10"
            >
              {/* Accent line */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[oklch(0.55_0.22_260)] to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-white/50">
                  {spec.label}
                </p>
                <p className="text-3xl font-light text-white">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div
          className={`mt-12 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/60">
            {activeView === "physical"
              ? "Our physical layer integrates sensors, controllers, and power systems into a unified network. Advanced hardware designed for reliability and scalability ensures your home responds instantly to every command."
              : "The cognitive layer employs machine learning algorithms to understand patterns, predict needs, and optimize performance. Self-learning foundations continuously refine their understanding of your preferences and habits."}
          </p>
        </div>
      </div>
    </section>
  )
}
