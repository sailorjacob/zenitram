"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  details: string[]
  gifUrl: string
}

export function ServiceModal({ isOpen, onClose, title, description, details, gifUrl }: ServiceModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

      {/* Modal */}
      <div
        className="relative z-10 mx-4 w-full max-w-3xl animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* GIF Background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <img
            src={gifUrl}
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-3 text-4xl font-light tracking-tight text-white md:text-5xl">
              {title}
            </h2>
            <p className="text-lg text-white/80">{description}</p>
          </div>

          {/* Details */}
          <div className="grid gap-4 md:grid-cols-2">
            {details.map((detail, index) => (
              <div
                key={index}
                className="group flex items-start gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[oklch(0.65_0.18_35)]" />
                <p className="text-sm leading-relaxed text-white/90">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
