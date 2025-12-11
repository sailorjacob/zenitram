"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const VIDEO_URLS = [
  "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_Create_a_website_image_asset_for_this_type_of_websi_b6992993-5544-4c17-a0b1-e9b8666d6e5d_2.mp4",
  "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_Create_a_website_image_asset_for_this_type_of_websi_aef6452b-6fdd-4ed8-a2a9-e64f3c8370c4_3.mp4",
  "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_Create_a_website_image_asset_for_this_type_of_websi_62963523-87d2-4de7-ace6-3384317c3af0_2.mp4",
  "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_Create_a_website_image_asset_for_this_type_of_websi_4613282c-b6f0-4c78-8928-4105abf1e599_0.mp4",
  "https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/zenitram/sides2721_Create_a_website_image_asset_for_this_type_of_websi_011e69d8-3d29-4d6e-8aba-9165d9791705_3.mp4",
]

interface DreamVideoBackgroundProps {
  scrollProgress: number // 0 to 1 representing total scroll progress
  currentSection: number
}

export function DreamVideoBackground({ scrollProgress, currentSection }: DreamVideoBackgroundProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>([false, false, false, false, false])
  const [portalSize, setPortalSize] = useState(0)
  const [portalOpacity, setPortalOpacity] = useState(0)

  // Map sections to videos - each video corresponds to sections
  // Section 0 (Hero): No video or subtle video
  // Section 1-4: Different videos
  // Section 5 (Contact): Fade out
  useEffect(() => {
    const sectionToVideo: Record<number, number> = {
      0: 0, // Hero - first video
      1: 1, // Features
      2: 2, // Solutions
      3: 3, // Technology
      4: 4, // Showcase - new fifth video
      5: 1, // Contact
    }
    setActiveVideoIndex(sectionToVideo[currentSection] ?? 0)
  }, [currentSection])

  // Calculate portal animation based on scroll
  useEffect(() => {
    // Create a pulsing/breathing effect based on scroll progress
    const sectionProgress = (scrollProgress * 5) % 1 // Progress within each section
    
    // Portal opens up when entering a section, closes when leaving
    // Creates a "breathing" circular reveal
    const openPhase = Math.sin(sectionProgress * Math.PI) // 0 -> 1 -> 0
    
    // Base size varies by section - hero has smaller portal, middle sections larger
    const baseSizes: Record<number, number> = {
      0: 30, // Hero - small mysterious portal
      1: 60, // Features - medium
      2: 80, // Solutions - large
      3: 70, // Technology - medium-large
      4: 90, // Showcase - very large
      5: 40, // Contact - closing down
    }
    
    const baseSize = baseSizes[currentSection] ?? 50
    const dynamicSize = baseSize + (openPhase * 20) // Breathe between base and base+20
    
    setPortalSize(dynamicSize)
    
    // Opacity also pulses
    const baseOpacity = currentSection === 0 ? 0.3 : currentSection === 5 ? 0.2 : 0.5
    setPortalOpacity(baseOpacity + (openPhase * 0.15))
  }, [scrollProgress, currentSection])

  // Handle video loading
  const handleVideoLoaded = useCallback((index: number) => {
    setVideosLoaded(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }, [])

  // Play/pause videos based on which is active
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeVideoIndex) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    })
  }, [activeVideoIndex])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Videos layer */}
      {VIDEO_URLS.map((url, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: index === activeVideoIndex ? 1 : 0,
          }}
        >
          <video
            ref={el => { videoRefs.current[index] = el }}
            src={url}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => handleVideoLoaded(index)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "blur(1px) saturate(0.7)",
            }}
          />
        </div>
      ))}

      {/* Circular vignette mask - the "dream portal" effect */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            transparent ${portalSize * 0.3}%,
            rgba(0, 0, 0, 0.3) ${portalSize * 0.5}%,
            rgba(0, 0, 0, 0.6) ${portalSize * 0.7}%,
            rgba(0, 0, 0, 0.85) ${portalSize * 0.85}%,
            rgba(0, 0, 0, 0.95) ${portalSize}%,
            rgb(0, 0, 0) 100%
          )`,
        }}
      />

      {/* Additional dreamy overlay with soft edges */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background: `radial-gradient(
            ellipse 80% 60% at 50% 50%,
            rgba(200, 180, 150, ${portalOpacity * 0.1}) 0%,
            rgba(100, 120, 180, ${portalOpacity * 0.05}) 50%,
            transparent 100%
          )`,
        }}
      />

      {/* Soft inner glow for dreamlike quality */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: portalOpacity,
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(200, 180, 150, 0.03) 0%,
            transparent ${portalSize * 0.5}%
          )`,
        }}
      />

      {/* Dark overlay to control overall intensity */}
      <div 
        className="absolute inset-0 bg-black/40 transition-opacity duration-500"
        style={{
          opacity: currentSection === 0 ? 0.55 : 0.45,
        }}
      />

      {/* Animated ring around the portal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            transparent ${portalSize * 0.8}%,
            rgba(200, 180, 150, ${portalOpacity * 0.15}) ${portalSize * 0.82}%,
            rgba(200, 180, 150, ${portalOpacity * 0.08}) ${portalSize * 0.85}%,
            transparent ${portalSize * 0.9}%
          )`,
        }}
      />
    </div>
  )
}
