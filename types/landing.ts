export interface LandingPage {
  id: number
  theme: 'dark' | 'light' | 'light-accent'
  backgroundColor: string
}

export interface ServiceCard {
  id: string
  title: string
  description: string
  icon: string
  details: string[]
}

export interface PartnerLogo {
  name: string
  logo: string
}

export interface ScrollProgress {
  currentPage: number
  scrollProgress: number
  isTransitioning: boolean
}
