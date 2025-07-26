"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect } from "react"
import { siteContent } from "@/content/siteContent"
import AnimatedText from "./AnimatedText"

export default function EnhancedHeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 50)
      mouseY.set((e.clientY - window.innerHeight / 2) / 50)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start">
      {/* Animated background text with parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ y, scale }}
      >
        <motion.span
          className="text-[25vw] font-bebas text-white/3 select-none"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {siteContent.hero.backgroundText}
        </motion.span>
      </motion.div>

      {/* Enhanced Portal/Gateway Animation */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ x: springX, y: springY }}>
        {/* Multiple rotating rings */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border border-white/${20 - i * 3} rounded-full`}
            style={{
              width: `${300 + i * 80}px`,
              height: `${300 + i * 80}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 20 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: {
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            {/* Inner geometric patterns */}
            <div className="absolute inset-4 border border-white/5 rounded-full">
              <motion.div
                className="absolute inset-4 border border-white/3 rounded-full"
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* Central energy core */}
        <motion.div
          className="absolute w-8 h-8 bg-white/30 rounded-full blur-sm"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Enhanced main content */}
      <motion.div className="relative z-10 text-center px-8" style={{ opacity }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <AnimatedText
            text={siteContent.hero.title}
            className="text-6xl md:text-8xl lg:text-9xl font-bebas text-white mb-4 tracking-wider"
            isHeadline={true}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <AnimatedText
            text={siteContent.hero.subtitle}
            className="text-2xl md:text-3xl font-bebas text-white/80 mb-8 tracking-widest"
            delay={0.5}
            isHeadline={true}
          />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {siteContent.hero.description}
        </motion.p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button
            className="group relative px-12 py-6 border-2 border-white text-white font-bebas text-xl tracking-wider overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-white/50"
              animate={{
                borderColor: ["rgba(255,255,255,0.5)", "rgba(255,255,255,1)", "rgba(255,255,255,0.5)"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              {siteContent.hero.cta}
            </span>
          </motion.button>

          <motion.button
            className="group relative px-12 py-6 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bebas text-xl tracking-wider overflow-hidden hover:bg-white/20 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.7, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{siteContent.hero.ctaSecondary}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent mb-2"
          animate={{
            scaleY: [1, 0.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="w-2 h-2 border border-white/60 rounded-full"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
      </motion.div>
    </section>
  )
}
