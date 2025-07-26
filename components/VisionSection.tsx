"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "@/content/siteContent"
import GlassPanel from "./GlassPanel"
import AnimatedText from "./AnimatedText"

export default function VisionSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={ref} className="relative py-32 px-8 overflow-hidden">
      {/* Rotating geometric background */}
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ rotate }}>
        <div className="w-[800px] h-[800px] border border-white/5 rounded-full">
          <div className="w-full h-full border border-white/3 rounded-full m-16">
            <div className="w-full h-full border border-white/2 rounded-full m-16"></div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <AnimatedText
            text={siteContent.vision.title}
            className="text-5xl md:text-7xl font-bebas text-white mb-6"
            isHeadline={true}
          />

          <AnimatedText
            text={siteContent.vision.subtitle}
            className="text-xl md:text-2xl font-inter text-white/60 mb-8"
            delay={0.3}
          />

          <motion.p
            className="text-lg font-inter text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {siteContent.vision.description}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteContent.vision.features.map((feature, index) => (
            <motion.div
              key={feature}
              className="group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlassPanel className="p-8 h-full">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
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
                  <h3 className="text-xl font-bebas text-white group-hover:text-white/80 transition-colors">
                    {feature}
                  </h3>
                </div>

                <motion.div
                  className="mt-4 h-px bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  viewport={{ once: true }}
                />
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Mysterious hint */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/40 font-inter text-sm tracking-wider">{"// MORE TO BE REVEALED"}</p>
        </motion.div>
      </div>
    </section>
  )
}
