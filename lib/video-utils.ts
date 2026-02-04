export function preloadVideo(url: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.preload = "auto"
    video.muted = true
    video.playsInline = true
    video.loop = true

    video.addEventListener("loadeddata", () => resolve(video), { once: true })
    video.addEventListener("error", reject, { once: true })

    video.src = url
  })
}

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function getVideoFallback(theme: "dark" | "light"): string {
  return theme === "dark"
    ? "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)"
    : "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)"
}
