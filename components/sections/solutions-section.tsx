"use client"

import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"

export function SolutionsSection() {
  const { ref, isVisible } = useReveal(0.3)

  const solutions = [
    {
      number: "01",
      title: "Residential Smart Homes",
      category: "Luxury Living",
      year: "2024",
      direction: "left",
    },
    {
      number: "02",
      title: "Commercial Spaces",
      category: "Enterprise Solutions",
      year: "2024",
      direction: "right",
    },
    {
      number: "03",
      title: "Hospitality Integration",
      category: "Guest Experience",
      year: "2023",
      direction: "left",
    },
  ]

  return (
    <div ref={ref} className="mx-auto w-full max-w-7xl">
      <div
        className={`mb-12 transition-all duration-700 md:mb-16 text-center ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
        }`}
      >
        <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <AnimatedText text="Solutions" variant="wave" shimmer />
        </h2>
        <p className="font-mono text-sm text-foreground/60 md:text-base">
          <AnimatedText text="Tailored implementations" variant="dissolve" />
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {solutions.map((project, i) => (
          <div
            key={i}
            className={`group flex items-center justify-between border-b border-accent/10 py-6 transition-all duration-700 hover:border-accent/30 md:py-8 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : project.direction === "left"
                  ? "-translate-y-8 opacity-0"
                  : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <div className="flex items-baseline gap-4 md:gap-8">
              <span className="font-mono text-sm text-accent/50 transition-colors group-hover:text-accent/70 md:text-base">
                {project.number}
              </span>
              <div>
                <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
                  <AnimatedText text={project.title} variant="wave" />
                </h3>
                <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
              </div>
            </div>
            <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
