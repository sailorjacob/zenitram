"use client"

import { useEffect, useRef } from "react"

interface BlendVideoProps {
  video1Url: string
  video2Url: string
  blendProgress: number // 0 to 1
  className?: string
}

export function BlendVideo({ video1Url, video2Url, blendProgress, className = "" }: BlendVideoProps) {
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video1 = video1Ref.current
    const video2 = video2Ref.current

    if (!video1 || !video2) return

    // Autoplay both videos
    const playPromise1 = video1.play()
    const playPromise2 = video2.play()

    Promise.all([playPromise1, playPromise2]).catch((error) => {
      console.log("Autoplay was prevented:", error)
    })
  }, [])

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Video 1 - Fades out as progress increases */}
      <video
        ref={video1Ref}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
        style={{
          opacity: 1 - blendProgress,
          mixBlendMode: "screen",
        }}
      >
        <source src={video1Url} type="video/mp4" />
      </video>

      {/* Video 2 - Fades in as progress increases */}
      <video
        ref={video2Ref}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
        style={{
          opacity: blendProgress,
          mixBlendMode: "screen",
        }}
      >
        <source src={video2Url} type="video/mp4" />
      </video>
    </div>
  )
}
