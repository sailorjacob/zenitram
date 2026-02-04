"use client"

import { BlendVideo } from "@/components/effects/blend-video"

interface GalaxyTransitionProps {
  progress: number // 0 to 1, based on scroll between pages 4 and 5
  isVisible: boolean
}

export function GalaxyTransition({ progress, isVisible }: GalaxyTransitionProps) {
  const video1Url =
    "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_spinning_galaxy_of_icons_for_home_automation_follow_057e0f0f-7a12-46b6-9100-40f65376e030_0.mp4"
  const video2Url =
    "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_spinning_galaxy_of_icons_for_home_automation_follow_564b0fea-c18a-481e-961e-c0c661e88feb_0.mp4"

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
      {/* Background gradient transition */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(135deg, 
            oklch(${0.02 + progress * 0.94} 0 0) 0%, 
            oklch(${0.05 + progress * 0.9} 0.005 260) 100%
          )`,
        }}
      />

      {/* Galaxy videos */}
      <div className="relative h-[80vh] w-[80vh] max-w-full">
        <BlendVideo
          video1Url={video1Url}
          video2Url={video2Url}
          blendProgress={progress}
          className="animate-spin-slow rounded-full"
        />

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,${0.1 * progress}) 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  )
}
