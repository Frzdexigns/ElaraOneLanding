"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "@/content/siteContent"
import GlassPanel from "./GlassPanel"
import AnimatedText from "./AnimatedText"

export default function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"])

  return (
    <section ref={ref} className="relative py-32 px-8">
      {/* Parallax background text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ x }}
      >
        <span className="text-[15vw] font-bebas text-white/3 whitespace-nowrap">
          TRANSFORMATION • EVOLUTION • METAMORPHOSIS •
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <AnimatedText
            text={siteContent.about.title}
            className="text-5xl md:text-7xl font-bebas text-white mb-6"
            isHeadline={true}
          />

          <AnimatedText
            text={siteContent.about.subtitle}
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
            {siteContent.about.description}
          </motion.p>
        </div>

        {/* Stage Evolution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.about.stages.map((stage, index) => (
            <GlassPanel key={stage.name} delay={index * 0.2} className="p-8 text-center">
              <motion.div
                className="w-full h-64 bg-white/5 border border-white/10 rounded mb-6 flex items-center justify-center"
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-24 h-24 border-2 border-white/30 rounded-full flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 bg-white/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 2 + index * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                  />
                </div>
              </motion.div>

              <h3 className="text-2xl font-bebas text-white mb-2">{stage.name}</h3>
              <p className="text-white/60 font-inter">{stage.description}</p>
            </GlassPanel>
          ))}
        </div>

        {/* Evolution Arrow */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center space-x-4"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-8 h-px bg-white/40" />
            <div className="w-0 h-0 border-l-4 border-l-white/40 border-y-2 border-y-transparent" />
            <div className="w-8 h-px bg-white/40" />
            <div className="w-0 h-0 border-l-4 border-l-white/40 border-y-2 border-y-transparent" />
            <div className="w-8 h-px bg-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
