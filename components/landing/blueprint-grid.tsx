"use client"

interface BlueprintGridProps {
  variant?: "default" | "dots" | "lines"
  color?: string
  opacity?: number
}

export function BlueprintGrid({ variant = "default", color = "oklch(0.65 0.18 35)", opacity = 0.08 }: BlueprintGridProps) {
  if (variant === "dots") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity,
          }}
        />
      </div>
    )
  }

  if (variant === "lines") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(${color} 1px, transparent 1px),
              linear-gradient(90deg, ${color} 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity,
          }}
        />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="blueprint-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              opacity={opacity}
            />
            <circle cx="0" cy="0" r="1.5" fill={color} opacity={opacity * 1.5} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>
    </div>
  )
}
