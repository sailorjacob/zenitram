"use client"

import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"
import { PartnersCarousel } from "./partners-carousel"
import { Zap, Shield, Cpu } from "lucide-react"

export function Page2Philosophy() {
  const { ref, isVisible } = useReveal(0.2)

  const values = [
    {
      icon: Zap,
      title: "Intuitive Design",
      description:
        "Technology that understands you. Our systems learn your preferences and adapt seamlessly to your lifestyle, creating an environment that feels natural and effortless.",
    },
    {
      icon: Shield,
      title: "Uncompromising Security",
      description:
        "Enterprise-grade protection for your home. Military-level encryption and real-time threat detection ensure your privacy and safety are never compromised.",
    },
    {
      icon: Cpu,
      title: "Future-Ready Intelligence",
      description:
        "Built on adaptive AI that grows with you. Our modular architecture evolves with emerging technologies, ensuring your investment stays relevant for years to come.",
    },
  ]

  return (
    <section
      ref={ref}
      className="page-light relative flex min-h-screen w-full items-center justify-center overflow-hidden py-24"
    >
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 76%, transparent 77%)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div
          className={`mb-20 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-5xl font-light tracking-tight text-[oklch(0.15_0_0)] md:text-7xl lg:text-8xl">
            <AnimatedText text="Built for Tomorrow" variant="wave" />
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[oklch(0.4_0_0)] md:text-xl">
            Pioneering the next generation of intelligent living spaces with technology that anticipates, adapts, and enhances every moment.
          </p>
        </div>

        {/* Value Props */}
        <div className="mb-24 grid gap-12 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl hover:ring-black/10 md:p-10">
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[oklch(0.15_0_0)] transition-transform group-hover:scale-110">
                  <value.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-4 text-2xl font-light tracking-tight text-[oklch(0.15_0_0)]">
                  <AnimatedText text={value.title} variant="cut" />
                </h3>
                <p className="leading-relaxed text-[oklch(0.45_0_0)]">
                  {value.description}
                </p>

                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[oklch(0.15_0_0)] opacity-[0.02] transition-all group-hover:scale-150" />
              </div>
            </div>
          ))}
        </div>

        {/* Partners Carousel */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          <PartnersCarousel />
        </div>
      </div>
    </section>
  )
}
