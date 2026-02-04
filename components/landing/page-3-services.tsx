"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"
import { BlueprintGrid } from "./blueprint-grid"
import { ServiceModal } from "./service-modal"
import { Lightbulb, Thermometer, Lock, Music, Battery, Smartphone } from "lucide-react"

export function Page3Services() {
  const { ref, isVisible } = useReveal(0.2)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    {
      id: "automation",
      icon: Lightbulb,
      title: "Smart Automation",
      description: "Intelligent lighting and scene control",
      details: [
        "Adaptive circadian rhythm lighting",
        "Voice and gesture control integration",
        "Automated scene triggers based on time and activity",
        "Energy-efficient LED management",
        "Color temperature optimization",
        "Seamless third-party device integration",
      ],
    },
    {
      id: "climate",
      icon: Thermometer,
      title: "Climate Control",
      description: "Precision temperature management",
      details: [
        "AI-powered learning for optimal comfort",
        "Geofencing for arrival/departure automation",
        "Multi-zone temperature control",
        "Weather-based predictive adjustments",
        "Energy consumption monitoring",
        "Integration with renewable energy systems",
      ],
    },
    {
      id: "security",
      icon: Lock,
      title: "Security Systems",
      description: "Advanced monitoring and protection",
      details: [
        "Real-time alerts and notifications",
        "Multi-point door and window sensors",
        "Integrated camera feeds with AI detection",
        "Automated response protocols",
        "Secure remote access",
        "Emergency service integration",
      ],
    },
    {
      id: "audio",
      icon: Music,
      title: "Audio Integration",
      description: "Whole-home audio distribution",
      details: [
        "Room-by-room independent control",
        "Multi-zone synchronized playback",
        "Streaming service integration",
        "Voice-activated commands",
        "High-fidelity audio processing",
        "Smart speaker ecosystem compatibility",
      ],
    },
    {
      id: "energy",
      icon: Battery,
      title: "Energy Management",
      description: "Intelligent power optimization",
      details: [
        "Real-time consumption monitoring",
        "Automated load balancing",
        "Solar and battery integration",
        "Peak demand reduction",
        "Detailed usage analytics",
        "Carbon footprint tracking",
      ],
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: "Mobile Control",
      description: "Seamless remote management",
      details: [
        "Intuitive mobile app interface",
        "Real-time status updates",
        "Global remote access",
        "Automation scheduling",
        "Emergency override features",
        "Multi-user access management",
      ],
    },
  ]

  const selectedServiceData = services.find((s) => s.id === selectedService)

  return (
    <section
      ref={ref}
      className="page-light-accent relative flex min-h-screen w-full items-center justify-center overflow-hidden py-24"
    >
      {/* Blueprint Grid Background */}
      <BlueprintGrid variant="lines" color="oklch(0.65 0.18 35)" opacity={0.06} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-5xl font-light tracking-tight text-[oklch(0.15_0_0)] md:text-7xl">
            <AnimatedText text="What We Do" variant="wave" />
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[oklch(0.4_0_0)]">
            Comprehensive solutions for every aspect of your intelligent home
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`group relative overflow-hidden rounded-2xl bg-white p-8 text-left shadow-sm ring-1 ring-[oklch(0.65_0.18_35)]/20 transition-all hover:shadow-xl hover:ring-[oklch(0.65_0.18_35)]/40 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Progress bar */}
              <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-[oklch(0.65_0.18_35)]/10">
                <div className="h-full w-0 bg-[oklch(0.65_0.18_35)] transition-all duration-500 group-hover:w-full" />
              </div>

              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.65_0.18_35)]/10 transition-all group-hover:bg-[oklch(0.65_0.18_35)]/20">
                <service.icon
                  className="h-6 w-6 text-[oklch(0.65_0.18_35)]"
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-light tracking-tight text-[oklch(0.15_0_0)]">
                <AnimatedText text={service.title} variant="cut" />
              </h3>
              <p className="text-sm text-[oklch(0.45_0_0)]">{service.description}</p>

              {/* Hover indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[oklch(0.65_0.18_35)] opacity-0 transition-opacity group-hover:opacity-100">
                Learn More
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {selectedServiceData && (
        <ServiceModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedServiceData.title}
          description={selectedServiceData.description}
          details={selectedServiceData.details}
          gifUrl="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_seamlessly_looping_liquid_metal_iridescent_metallic_8bd899ee-7749-4af1-8f34-a0eab5d90b9e_3.gif"
        />
      )}
    </section>
  )
}
