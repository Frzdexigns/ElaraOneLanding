"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "@/content/siteContent"
import AnimatedText from "./AnimatedText"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background text */}
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ y }}>
        <span className="text-[20vw] font-bebas text-white/5 select-none">{siteContent.hero.backgroundText}</span>
      </motion.div>

      {/* Portal/Gateway Animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="w-96 h-96 border-2 border-white/20 rounded-full">
          <div className="w-full h-full border border-white/10 rounded-full m-4">
            <div className="w-full h-full border border-white/5 rounded-full m-8"></div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div className="relative z-10 text-center px-8" style={{ opacity }}>
        <AnimatedText
          text={siteContent.hero.title}
          className="text-6xl md:text-8xl lg:text-9xl font-bebas text-white mb-4"
          isHeadline={true}
        />

        <AnimatedText
          text={siteContent.hero.subtitle}
          className="text-2xl md:text-3xl font-bebas text-white/80 mb-8"
          delay={0.5}
          isHeadline={true}
        />

        <motion.p
          className="text-lg md:text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {siteContent.hero.description}
        </motion.p>

        <motion.button
          className="px-8 py-4 border-2 border-white text-white font-bebas text-xl tracking-wider hover:bg-white hover:text-black transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {siteContent.hero.cta}
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-px h-16 bg-white/40"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </section>
  )
}
