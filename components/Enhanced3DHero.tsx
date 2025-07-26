"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, Suspense } from "react"
import { siteContent } from "@/content/siteContent"
import AnimatedText from "./AnimatedText"
import ParallaxText from "./ParallaxText"

export default function Enhanced3DHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // 3D scroll effects
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, -15])
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 5])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      mouseX.set((clientX - innerWidth / 2) / 50)
      mouseY.set((clientY - innerHeight / 2) / 50)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start">
      {/* 3D Parallax Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          rotateX,
          rotateY,
          scale,
          y,
          transformStyle: "preserve-3d",
        }}
      >
        <ParallaxText speed={0.3} className="text-[25vw] font-orbitron text-white/3 select-none">
          {siteContent.hero.backgroundText}
        </ParallaxText>
      </motion.div>

      {/* Enhanced 3D Portal */}
      <Suspense fallback={<div className="w-96 h-96 border border-white/20 rounded-full" />}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            x: springX,
            y: springY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Multiple 3D rings with strategic green accents */}
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute border rounded-full ${
                i === 2 || i === 5 ? "border-accent-green/20" : `border-white/${25 - i * 3}`
              }`}
              style={{
                width: `${250 + i * 60}px`,
                height: `${250 + i * 60}px`,
                transform: `translateZ(${i * -20}px)`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
                borderColor:
                  i === 2 || i === 5
                    ? ["rgba(49, 197, 149, 0.2)", "rgba(49, 197, 149, 0.4)", "rgba(49, 197, 149, 0.2)"]
                    : undefined,
              }}
              transition={{
                rotate: {
                  duration: 15 + i * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                borderColor: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              {/* Inner 3D elements */}
              <motion.div
                className="absolute inset-4 border border-white/10 rounded-full"
                style={{ transform: `rotateY(${i * 45}deg) translateZ(10px)` }}
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          ))}

          {/* Central 3D core with green accent */}
          <motion.div
            className="absolute w-12 h-12 bg-gradient-to-r from-white/40 to-accent-green/40 rounded-full blur-sm"
            style={{ transform: "translateZ(50px)" }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 0.9, 0.4],
              rotateZ: [0, 360],
            }}
            transition={{
              scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY },
              opacity: { duration: 2.5, repeat: Number.POSITIVE_INFINITY },
              rotateZ: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />
        </motion.div>
      </Suspense>

      {/* Enhanced main content with 3D effects */}
      <motion.div
        className="relative z-10 text-center px-8"
        style={{
          opacity,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ delay: 1, duration: 1.2 }}
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Two-line title */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-orbitron text-white mb-4 tracking-wider leading-tight">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              THE FUTURE OF
            </motion.div>
            <motion.div
              className="text-accent-green"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              NFTS
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, z: -50 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ transform: "translateZ(20px)" }}
        >
          <AnimatedText
            text={siteContent.hero.subtitle}
            className="text-2xl md:text-3xl font-orbitron text-white/80 mb-8 tracking-widest"
            delay={0.5}
            isHeadline={true}
            accentWord="HERE"
          />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30, z: -30 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{ transform: "translateZ(10px)" }}
        >
          {siteContent.hero.description}
        </motion.p>

        {/* Enhanced 3D CTA Buttons with green accents */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button
            className="group relative px-12 py-6 border-2 border-accent-green text-white font-orbitron text-xl tracking-wider overflow-hidden glow-green-hover"
            initial={{ opacity: 0, scale: 0.8, z: -20 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: 5,
              z: 20,
              borderColor: "#31c595",
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-accent-green"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              {siteContent.hero.cta}
            </span>
          </motion.button>

          <motion.button
            className="group relative px-12 py-6 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-orbitron text-xl tracking-wider overflow-hidden hover:border-accent-green/50"
            initial={{ opacity: 0, scale: 0.8, z: -20 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{ delay: 2.7, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              rotateX: -5,
              rotateY: -5,
              z: 20,
              backgroundColor: "rgba(49, 197, 149, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="relative z-10">{siteContent.hero.ctaSecondary}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced 3D scroll indicator with green accent */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, z: -30 }}
        animate={{ opacity: 1, z: 0 }}
        transition={{ delay: 3, duration: 1 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-accent-green/60 to-transparent mb-2"
          animate={{
            scaleY: [1, 0.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          style={{ transform: "translateZ(10px)" }}
        />
        <motion.div
          className="w-2 h-2 border border-accent-green/60 rounded-full"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
            rotateZ: [0, 360],
          }}
          transition={{
            y: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 },
            opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 },
            rotateZ: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
          style={{ transform: "translateZ(5px)" }}
        />
      </motion.div>
    </section>
  )
}
