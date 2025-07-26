"use client"

import { Suspense, lazy } from "react"
import ScrollProgress from "@/components/ScrollProgress"
import StickyHeader from "@/components/StickyHeader"
import AnimatedSidebar from "@/components/AnimatedSidebar"
import Enhanced3DHero from "@/components/Enhanced3DHero"
import SectionReveal from "@/components/SectionReveal"
import { useState } from "react"

// Lazy load heavy components
const LazyBackground = lazy(() => import("@/components/LazyBackground"))
const EnhancedGridOverlay = lazy(() => import("@/components/EnhancedGridOverlay"))
const EnhancedAboutSection = lazy(() => import("@/components/EnhancedAboutSection"))
const EnhancedVisionSection = lazy(() => import("@/components/EnhancedVisionSection"))
const PhasesSection = lazy(() => import("@/components/PhasesSection"))
const TechnologySection = lazy(() => import("@/components/TechnologySection"))
const StorySection = lazy(() => import("@/components/StorySection"))
const FooterSection = lazy(() => import("@/components/WaitlistSection"))

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <main className="bg-black text-white min-h-screen relative overflow-x-hidden snap-y snap-mandatory">
      {/* Performance optimized components */}
      <ScrollProgress />
      <StickyHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Lazy loaded background */}
      <Suspense fallback={null}>
        <LazyBackground />
        <EnhancedGridOverlay />
      </Suspense>

      {/* Hero section - loaded immediately with header spacing */}
      <div className="pt-16 xs:pt-18 sm:pt-20 md:pt-24">
        <Enhanced3DHero />
      </div>

      {/* Lazy loaded sections with intersection observers */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <SectionReveal id="about">
          <EnhancedAboutSection />
        </SectionReveal>

        <SectionReveal id="vision" delay={0.1}>
          <EnhancedVisionSection />
        </SectionReveal>

        <SectionReveal id="phases" delay={0.2}>
          <PhasesSection />
        </SectionReveal>

        <SectionReveal id="technology" delay={0.3}>
          <TechnologySection />
        </SectionReveal>

        <SectionReveal id="story" delay={0.4}>
          <StorySection />
        </SectionReveal>

        <FooterSection />
      </Suspense>
    </main>
  )
}
