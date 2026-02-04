"use client"

import { useEffect, useRef, useState } from "react"

interface Partner {
  name: string
  logo: string
}

const partners: Partner[] = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
  { name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
]

export function PartnersCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden py-12">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-foreground/60">
          Trusted by leading homes worldwide
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className={`flex gap-16 ${isPaused ? "" : "animate-scroll"}`}
          style={{
            width: "max-content",
          }}
        >
          {/* Duplicate partners for seamless loop */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex h-20 w-32 shrink-0 items-center justify-center grayscale transition-all hover:grayscale-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-full object-contain opacity-50 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
