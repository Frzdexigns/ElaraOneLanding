"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "@/content/siteContent"
import PremiumGlassPanel from "./PremiumGlassPanel"
import FlipCard from "./FlipCard"
import AnimatedText from "./AnimatedText"
import ScrollSnapSection from "./ScrollSnapSection"

export default function EnhancedAboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <ScrollSnapSection id="about">
      <div ref={ref} className="relative py-32 px-8 w-full">
        {/* Enhanced parallax background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ x }}
        >
          <motion.span className="text-[20vw] font-orbitron text-white/2 whitespace-nowrap" style={{ rotate }}>
            TRANSFORMATION • <span className="text-accent-green/10">EVOLUTION</span> • METAMORPHOSIS •
          </motion.span>
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <AnimatedText
                text={siteContent.about.title}
                className="text-5xl md:text-7xl font-orbitron text-white mb-6 tracking-wider"
                isHeadline={true}
                accentWord="REIMAGINING"
              />
            </motion.div>

            <AnimatedText
              text={siteContent.about.subtitle}
              className="text-xl md:text-2xl font-inter text-white/60 mb-8"
              delay={0.3}
              accentWord="INTELLIGENCE"
            />

            <motion.p
              className="text-lg font-inter text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {siteContent.about.description}
            </motion.p>
          </div>

          {/* Enhanced Stage Evolution with Flip Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {siteContent.about.stages.map((stage, index) => (
              <motion.div
                key={stage.name}
                className="h-80"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <FlipCard
                  delay={index * 0.2}
                  front={
                    <PremiumGlassPanel className="p-8 text-center h-full flex flex-col justify-center">
                      <motion.div
                        className="w-full h-32 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                            ],
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            x: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                          }}
                        />
                        <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center relative z-10">
                          <motion.div
                            className="w-8 h-8 bg-white/30 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                              duration: 2 + index * 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: index * 0.3,
                            }}
                          />
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-orbitron text-white mb-2 tracking-wider">{stage.name}</h3>
                      <p className="text-white/60 font-inter">{stage.description}</p>
                    </PremiumGlassPanel>
                  }
                  back={
                    <PremiumGlassPanel className="p-8 text-center h-full flex flex-col justify-center bg-gradient-to-br from-white/15 to-white/5">
                      <motion.div
                        className="w-full h-32 bg-gradient-to-br from-white/20 to-white/10 border border-white/30 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(255,255,255,0.1)",
                            "0 0 40px rgba(255,255,255,0.2)",
                            "0 0 20px rgba(255,255,255,0.1)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <motion.div
                          className="text-4xl font-orbitron text-accent-green"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          {index + 1}
                        </motion.div>
                      </motion.div>
                      <h3 className="text-2xl font-orbitron text-accent-green mb-2 tracking-wider">
                        STAGE {index + 1}
                      </h3>
                      <p className="text-white/80 font-inter">
                        Advanced {stage.description} with enhanced capabilities
                      </p>
                    </PremiumGlassPanel>
                  }
                />
              </motion.div>
            ))}
          </div>

          {/* Core Pillars with hover effects */}
          <div className="mt-20">
            <motion.h3
              className="text-3xl font-orbitron text-white text-center mb-12 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              CORE PILLARS
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteContent.about.pillars.map((pillar, index) => (
                <motion.div
                  key={pillar}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <PremiumGlassPanel className="p-6">
                    <div className="flex items-center justify-center mb-3">
                      <motion.div
                        className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-accent-green transition-colors duration-300"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.3,
                        }}
                      />
                    </div>
                    <p className="text-white/80 font-inter text-sm leading-relaxed">{pillar}</p>
                  </PremiumGlassPanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Evolution Arrow */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center space-x-4"
              animate={{
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex items-center space-x-2"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                >
                  <div className={`w-8 h-px ${i === 2 ? "bg-accent-green/40" : "bg-white/40"}`} />
                  <div
                    className={`w-0 h-0 border-l-4 border-y-2 border-y-transparent ${
                      i === 2 ? "border-l-accent-green/40" : "border-l-white/40"
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Centered button */}
          <div className="flex justify-center mt-8">
            <motion.button
              className="px-8 py-4 border-2 border-accent-green text-white font-orbitron text-lg tracking-wider hover:bg-accent-green hover:text-black transition-all duration-300 glow-green-hover"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {siteContent.vision.cta}
            </motion.button>
          </div>
        </div>
      </div>
    </ScrollSnapSection>
  )
}
