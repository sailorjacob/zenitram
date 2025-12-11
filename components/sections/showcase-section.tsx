"use client"

import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"

export function ShowcaseSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <div ref={ref} className="mx-auto w-full max-w-7xl">
      <div
        className={`mb-12 transition-all duration-700 md:mb-16 text-center ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
        }`}
      >
        <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <AnimatedText text="Live Demo" variant="spin" />
        </h2>
        <p className="font-mono text-sm text-foreground/60 md:text-base">
          <AnimatedText text="Interactive showcase" variant="dissolve" />
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {[
          {
            title: "Living Room",
            status: "All systems active",
          },
          {
            title: "Kitchen",
            status: "Climate optimized",
          },
          {
            title: "Bedroom",
            status: "Night mode enabled",
          },
        ].map((room, i) => (
          <div
            key={i}
            className={`group transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <div className="rounded-lg border border-accent/20 p-6 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/5">
              <h3 className="mb-2 font-sans text-lg font-light text-foreground">
                <AnimatedText text={room.title} variant="spin" />
              </h3>
              <p className="text-sm text-foreground/70">
                <AnimatedText text={room.status} variant="dissolve" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
