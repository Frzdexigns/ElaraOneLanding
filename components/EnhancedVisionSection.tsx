"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "@/content/siteContent"
import PremiumGlassPanel from "./PremiumGlassPanel"
import AnimatedText from "./AnimatedText"
import ScrollSnapSection from "./ScrollSnapSection"

export default function EnhancedVisionSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <ScrollSnapSection id="vision">
      <div ref={ref} className="relative py-32 px-8 overflow-hidden w-full">
        {/* Enhanced rotating geometric background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ rotate, scale }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute border rounded-full`}
              style={{
                width: `${600 + i * 200}px`,
                height: `${600 + i * 200}px`,
                borderColor: i === 1 ? "rgba(49, 197, 149, 0.08)" : `rgba(255,255,255,${0.08 - i * 0.02})`,
              }}
              animate={{
                rotate: [0, -360],
                borderColor:
                  i === 1
                    ? ["rgba(49, 197, 149, 0.08)", "rgba(49, 197, 149, 0.15)", "rgba(49, 197, 149, 0.08)"]
                    : [
                        `rgba(255,255,255,${0.08 - i * 0.02})`,
                        `rgba(255,255,255,${0.15 - i * 0.02})`,
                        `rgba(255,255,255,${0.08 - i * 0.02})`,
                      ],
              }}
              transition={{
                rotate: {
                  duration: 30 + i * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                borderColor: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <div
                className={`w-full h-full border rounded-full m-16`}
                style={{
                  borderColor: i === 2 ? "rgba(49, 197, 149, 0.05)" : `rgba(255,255,255,${0.05 - i * 0.01})`,
                }}
              >
                <motion.div
                  className={`w-full h-full border rounded-full m-16`}
                  style={{
                    borderColor: `rgba(255,255,255,${0.03 - i * 0.005})`,
                  }}
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <AnimatedText
              text={siteContent.vision.title}
              className="text-5xl md:text-7xl font-orbitron text-white mb-6 tracking-wider"
              isHeadline={true}
            />

            <AnimatedText
              text={siteContent.vision.subtitle}
              className="text-xl md:text-2xl font-inter text-white/60 mb-8"
              delay={0.3}
            />

            <motion.p
              className="text-lg font-inter text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {siteContent.vision.description}
            </motion.p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteContent.vision.features.map((feature, index) => (
              <motion.div
                key={feature}
                className="group h-32"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <PremiumGlassPanel className="p-8 h-full relative overflow-hidden">
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      className="w-4 h-4 bg-white/60 rounded-full group-hover:bg-accent-green transition-colors duration-300"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    />
                    <h3 className="text-xl font-orbitron text-white group-hover:text-white/80 transition-colors tracking-wider">
                      {feature}
                    </h3>
                  </div>

                  <motion.div
                    className="mt-4 h-px bg-white/30 group-hover:bg-accent-green/60 transition-colors duration-300"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    viewport={{ once: true }}
                  />
                </PremiumGlassPanel>
              </motion.div>
            ))}
          </div>

          {/* Enhanced mysterious hint */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <p className="text-white/40 font-inter text-sm tracking-[0.3em] font-mono">
                {"// MORE TO BE "}
                <span className="text-accent-green/60">REVEALED</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ScrollSnapSection>
  )
}
