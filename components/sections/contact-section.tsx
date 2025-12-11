"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedText } from "@/components/animated-text"

export function ContactSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", message: "" })

    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
        <div ref={ref} className="flex flex-col justify-center">
          <div
            className={`mb-6 transition-all duration-700 md:mb-12 ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
          >
            <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
              <span className="block">Start your</span>
              <span className="block text-accent">
                <AnimatedText text="automation" variant="spin" />
              </span>
            </h2>
            <p className="font-mono text-xs text-foreground/60 md:text-base">
              <AnimatedText text="Get in touch with our team" variant="dissolve" />
            </p>
          </div>

          <div className="space-y-4 md:space-y-8">
            <a
              href="mailto:info@zenitram.io"
              className={`group block transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="mb-1 flex items-center gap-2">
                <Mail className="h-3 w-3 text-accent" />
                <span className="font-mono text-xs text-foreground/60">Email</span>
              </div>
              <p className="text-base text-foreground transition-colors group-hover:text-accent md:text-2xl">
                <AnimatedText text="info@zenitram.io" variant="cut" />
              </p>
            </a>

            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <div className="mb-1 flex items-center gap-2">
                <Phone className="h-3 w-3 text-accent" />
                <span className="font-mono text-xs text-foreground/60">Phone</span>
              </div>
              <p className="text-base text-foreground md:text-2xl">
                <AnimatedText text="+1 (829) 576-0844" variant="wave" />
              </p>
            </div>

            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="mb-1 flex items-center gap-2">
                <MapPin className="h-3 w-3 text-accent" />
                <span className="font-mono text-xs text-foreground/60">Locations</span>
              </div>
              <p className="text-base text-foreground md:text-2xl">
                <AnimatedText text="Santo Domingo, Dominican Republic" variant="dissolve" />
              </p>
              <p className="text-base text-foreground/80 md:text-xl mt-1">
                <AnimatedText text="Miami, Florida, USA" variant="dissolve" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                <AnimatedText text="Name" variant="wave" />
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border-b border-accent/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent/60 focus:outline-none md:py-2 md:text-base"
                placeholder="Your name"
              />
            </div>

            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                <AnimatedText text="Email" variant="wave" />
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border-b border-accent/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent/60 focus:outline-none md:py-2 md:text-base"
                placeholder="your@email.com"
              />
            </div>

            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                <AnimatedText text="Message" variant="wave" />
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full border-b border-accent/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent/60 focus:outline-none md:py-2 md:text-base"
                placeholder="Tell us about your project..."
              />
            </div>

            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "650ms" }}
            >
              <MagneticButton
                variant="primary"
                size="lg"
                className="w-full disabled:opacity-50"
                onClick={isSubmitting ? undefined : undefined}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </MagneticButton>
              {submitSuccess && (
                <p className="mt-3 text-center font-mono text-sm text-accent">
                  <AnimatedText text="Message sent successfully!" variant="dissolve" />
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
