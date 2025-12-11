"use client"

import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"

export function TechnologySection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <div ref={ref} className="mx-auto w-full max-w-7xl">
      <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div>
          <div
            className={`mb-6 transition-all duration-700 md:mb-12 ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
          >
            <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
              <span className="block">Built on</span>
              <span className="block">cutting-edge</span>
              <span className="block text-accent">
                <AnimatedText text="technology" variant="spin" />
              </span>
            </h2>
          </div>

          <div
            className={`space-y-3 transition-all duration-700 md:space-y-4 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-lg">
              <AnimatedText
                text="We leverage the latest IoT standards and machine learning algorithms to create systems that are both powerful and intuitive."
                variant="dissolve"
              />
            </p>
            <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-lg">
              <AnimatedText
                text="Every integration is designed with security and sustainability at the core."
                variant="dissolve"
              />
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 md:space-y-12">
          {[
            { value: "99.9%", label: "Uptime", sublabel: "System reliability", direction: "right" },
            { value: "50ms", label: "Response", sublabel: "Average latency", direction: "left" },
            { value: "256-bit", label: "Encryption", sublabel: "Military grade", direction: "right" },
          ].map((stat, i) => {
            const getRevealClass = () => {
              if (!isVisible) {
                return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
              }
              return "translate-x-0 opacity-100"
            }

            return (
              <div
                key={i}
                className={`flex items-baseline gap-4 border-l border-accent/30 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                style={{
                  transitionDelay: `${300 + i * 150}ms`,
                }}
              >
                <div className="text-3xl font-light text-accent md:text-6xl lg:text-7xl">
                  <AnimatedText text={stat.value} variant="cut" />
                </div>
                <div>
                  <div className="font-sans text-base font-light text-foreground md:text-xl">
                    <AnimatedText text={stat.label} variant="spin" />
                  </div>
                  <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
