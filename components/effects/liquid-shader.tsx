"use client"

import { useEffect, useRef } from "react"

interface LiquidShaderProps {
  color1?: string
  color2?: string
  speed?: number
}

export function LiquidShader({
  color1 = "#857543",
  color2 = "#aa8866",
  speed = 0.001,
}: LiquidShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef(0)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      if (!ctx || !canvas) return

      timeRef.current += speed

      // Create gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width * Math.cos(timeRef.current),
        canvas.height * Math.sin(timeRef.current)
      )

      gradient.addColorStop(0, color1)
      gradient.addColorStop(0.5, color2)
      gradient.addColorStop(1, color1)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10
        data[i] += noise // R
        data[i + 1] += noise // G
        data[i + 2] += noise // B
      }

      ctx.putImageData(imageData, 0, 0)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [color1, color2, speed])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-20"
    />
  )
}
