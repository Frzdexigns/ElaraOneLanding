"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "@/content/siteContent"
import PremiumGlassPanel from "./PremiumGlassPanel"
import ScrollSnapSection from "./ScrollSnapSection"

export default function TechnologySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"])

  return (
    <ScrollSnapSection id="technology">
      <div ref={ref} className="relative py-32 px-8 w-full overflow-hidden">
        {/* Background tech pattern */}
        <motion.div className="absolute inset-0 opacity-5" style={{ y }}>
          <div className="text-[15vw] font-orbitron text-white/10 whitespace-nowrap transform rotate-12">
            TECHNOLOGY • INFRASTRUCTURE • AI • BLOCKCHAIN •
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              className="text-5xl md:text-7xl font-orbitron text-white mb-6 tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {siteContent.technology.title}
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl font-inter text-white/60 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {siteContent.technology.subtitle}
            </motion.p>

            <motion.p
              className="text-lg font-inter text-white/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {siteContent.technology.description}
            </motion.p>
          </div>

          {/* Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.technology.stack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <PremiumGlassPanel className="p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="w-3 h-3 bg-white/60 rounded-full mt-2 flex-shrink-0 group-hover:bg-accent-green transition-colors duration-300"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.4,
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-orbitron text-white mb-2 tracking-wider group-hover:text-white/80 transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-white/70 font-inter text-sm leading-relaxed">{tech.description}</p>
                    </div>
                  </div>

                  {/* Animated accent line */}
                  <motion.div
                    className="mt-4 h-px bg-white/20 group-hover:bg-accent-green/40 transition-colors duration-300"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </PremiumGlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollSnapSection>
  )
}
