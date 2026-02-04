"use client"

import { useState } from "react"

interface IsometricLayersProps {
  activeView: "physical" | "cognitive"
}

export function IsometricLayers({ activeView }: IsometricLayersProps) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)

  const physicalLayers = [
    { id: 1, name: "Sensor Network", color: "#4a90e2", description: "Environmental sensing" },
    { id: 2, name: "Control Systems", color: "#50c878", description: "Device automation" },
    { id: 3, name: "Power Management", color: "#f5a623", description: "Energy optimization" },
    { id: 4, name: "Network Layer", color: "#bd10e0", description: "Connectivity" },
  ]

  const cognitiveLayers = [
    { id: 1, name: "AI Core", color: "#e24a90", description: "Machine learning" },
    { id: 2, name: "Pattern Recognition", color: "#9013fe", description: "Behavior analysis" },
    { id: 3, name: "Predictive Engine", color: "#50e3c2", description: "Forecasting" },
    { id: 4, name: "Decision Matrix", color: "#f8e71c", description: "Automation logic" },
  ]

  const layers = activeView === "physical" ? physicalLayers : cognitiveLayers

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-3xl">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        style={{ transform: "rotateX(60deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}
      >
        <defs>
          {layers.map((layer) => (
            <linearGradient key={layer.id} id={`gradient-${layer.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={layer.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={layer.color} stopOpacity="0.3" />
            </linearGradient>
          ))}
        </defs>

        {layers.map((layer, index) => {
          const offset = index * 60
          const isHovered = hoveredLayer === layer.id

          return (
            <g
              key={layer.id}
              onMouseEnter={() => setHoveredLayer(layer.id)}
              onMouseLeave={() => setHoveredLayer(null)}
              className="cursor-pointer transition-transform duration-300"
              style={{
                transform: isHovered ? `translateY(-10px)` : "translateY(0)",
              }}
            >
              {/* Layer box */}
              <rect
                x="50"
                y={50 + offset}
                width="300"
                height="50"
                fill={`url(#gradient-${layer.id})`}
                stroke={layer.color}
                strokeWidth="2"
                rx="4"
                className="transition-all duration-300"
                style={{
                  filter: isHovered ? "brightness(1.3)" : "brightness(1)",
                }}
              />

              {/* Connection lines */}
              {index > 0 && (
                <line
                  x1="200"
                  y1={50 + offset}
                  x2="200"
                  y2={50 + offset - 10}
                  stroke={layer.color}
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
              )}

              {/* Label */}
              <text
                x="200"
                y={75 + offset}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="600"
              >
                {layer.name}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Layer details */}
      {hoveredLayer && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/90 px-4 py-2 text-sm text-white backdrop-blur-md">
          {layers.find((l) => l.id === hoveredLayer)?.description}
        </div>
      )}
    </div>
  )
}
