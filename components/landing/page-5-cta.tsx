"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { AnimatedText } from "@/components/animated-text"
import { MagneticButton } from "@/components/magnetic-button"
import { Mail, Phone, MapPin, Check } from "lucide-react"

interface Page5CTAProps {
  onContinue: () => void
}

export function Page5CTA({ onContinue }: Page5CTAProps) {
  const { ref, isVisible } = useReveal(0.2)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const benefits = [
    "Personalized consultation with our experts",
    "Custom system design for your space",
    "Professional installation and training",
    "Lifetime technical support",
    "Regular firmware updates and improvements",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
  }

  return (
    <section
      ref={ref}
      className="page-light-accent relative flex min-h-screen w-full items-center justify-center overflow-hidden py-24"
    >
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-[oklch(0.97_0.005_260)] to-[oklch(0.95_0.01_260)]" />

      {/* Subtle accent orbs */}
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.65_0.18_35)]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-[oklch(0.65_0.18_35)]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-5xl font-light tracking-tight text-[oklch(0.15_0_0)] md:text-7xl">
            <AnimatedText text="Ready to Transform" variant="wave" />
            <br />
            <span className="text-[oklch(0.65_0.18_35)]">
              <AnimatedText text="Your Space?" variant="wave" />
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[oklch(0.4_0_0)]">
            Join thousands of homeowners who have elevated their living experience
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-10">
              <h3 className="mb-6 text-2xl font-light tracking-tight text-[oklch(0.15_0_0)]">
                Get Started Today
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[oklch(0.3_0_0)]">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-[oklch(0.65_0.18_35)]/20 bg-white px-4 py-3 text-[oklch(0.15_0_0)] transition-all focus:border-[oklch(0.65_0.18_35)]/50 focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.18_35)]/20"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[oklch(0.3_0_0)]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-[oklch(0.65_0.18_35)]/20 bg-white px-4 py-3 text-[oklch(0.15_0_0)] transition-all focus:border-[oklch(0.65_0.18_35)]/50 focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.18_35)]/20"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[oklch(0.3_0_0)]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-[oklch(0.65_0.18_35)]/20 bg-white px-4 py-3 text-[oklch(0.15_0_0)] transition-all focus:border-[oklch(0.65_0.18_35)]/50 focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.18_35)]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[oklch(0.3_0_0)]">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full rounded-xl border border-[oklch(0.65_0.18_35)]/20 bg-white px-4 py-3 text-[oklch(0.15_0_0)] transition-all focus:border-[oklch(0.65_0.18_35)]/50 focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.18_35)]/20"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-[oklch(0.65_0.18_35)] hover:bg-[oklch(0.6_0.18_35)]"
                >
                  Submit Inquiry
                </MagneticButton>
              </form>

              {/* Contact Info */}
              <div className="mt-8 space-y-4 border-t border-[oklch(0.65_0.18_35)]/20 pt-8">
                <div className="flex items-center gap-3 text-sm text-[oklch(0.4_0_0)]">
                  <Mail className="h-4 w-4 text-[oklch(0.65_0.18_35)]" />
                  info@zenitram.io
                </div>
                <div className="flex items-center gap-3 text-sm text-[oklch(0.4_0_0)]">
                  <Phone className="h-4 w-4 text-[oklch(0.65_0.18_35)]" />
                  +1 (829) 576-0844
                </div>
                <div className="flex items-center gap-3 text-sm text-[oklch(0.4_0_0)]">
                  <MapPin className="h-4 w-4 text-[oklch(0.65_0.18_35)]" />
                  Miami, FL • Santo Domingo, DR
                </div>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="mb-8 text-3xl font-light tracking-tight text-[oklch(0.15_0_0)]">
              What You'll Get
            </h3>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(0.65_0.18_35)]/10">
                    <Check className="h-4 w-4 text-[oklch(0.65_0.18_35)]" strokeWidth={3} />
                  </div>
                  <p className="text-[oklch(0.3_0_0)]">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="mt-12">
              <MagneticButton
                variant="secondary"
                size="lg"
                onClick={onContinue}
                className="w-full"
              >
                Continue to Full Experience →
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
