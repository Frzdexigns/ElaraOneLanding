"use client"

import { motion } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import PremiumGlassPanel from "./PremiumGlassPanel"
import ScrollSnapSection from "./ScrollSnapSection"

export default function PhasesSection() {
  return (
    <ScrollSnapSection id="phases">
      <div className="relative py-32 px-8 w-full">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              className="text-5xl md:text-7xl font-bebas text-white mb-6 tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {siteContent.phases.title}
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl font-inter text-white/60 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {siteContent.phases.subtitle}
            </motion.p>
          </div>

          {/* Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteContent.phases.phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <PremiumGlassPanel className="p-8 h-full relative overflow-hidden">
                  {/* Lock Icon */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="w-6 h-6 border-2 border-white/40 rounded flex items-center justify-center"
                      animate={{
                        borderColor: ["rgba(255,255,255,0.4)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.4)"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    >
                      <div className="w-2 h-2 bg-white/60 rounded-full" />
                    </motion.div>
                  </div>

                  {/* Phase Number */}
                  <motion.div
                    className="text-6xl font-bebas text-white/20 mb-4"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.8,
                    }}
                  >
                    {phase.number}
                  </motion.div>

                  {/* Status Badge */}
                  <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-4">
                    <span className="text-xs font-inter text-white/80 tracking-wider">{phase.status}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bebas text-white mb-4 tracking-wider group-hover:text-white/80 transition-colors">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 font-inter leading-relaxed">{phase.description}</p>

                  {/* Animated bottom border */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    viewport={{ once: true }}
                  />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
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
