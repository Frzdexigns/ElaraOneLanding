"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { siteContent } from "@/content/siteContent"
import GlassPanel from "./GlassPanel"
import AnimatedText from "./AnimatedText"
import EmailSubscriptionModal from "./EmailSubscriptionModal"

export default function StorySection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="relative py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <GlassPanel className="p-12 text-center">
            <AnimatedText
              text={siteContent.story.title}
              className="text-4xl md:text-6xl font-orbitron text-white mb-4"
              isHeadline={true}
            />

            <AnimatedText
              text={siteContent.story.subtitle}
              className="text-lg md:text-xl font-inter text-white/60 mb-8"
              delay={0.3}
            />

            <motion.p
              className="text-lg font-inter text-white/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {siteContent.story.description}
            </motion.p>

            {/* Floating elements */}
            <div className="relative mt-12 h-32">
              {["STORIES", "GAMES", "IP"].map((word, index) => (
                <motion.div
                  key={word}
                  className="absolute text-white/20 font-orbitron text-2xl"
                  style={{
                    left: `${20 + index * 30}%`,
                    top: `${index * 20}px`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 border-2 border-accent-green text-white font-orbitron text-lg tracking-wider hover:bg-accent-green hover:text-black transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {siteContent.join.cta}
              </motion.button>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-orbitron text-lg tracking-wider hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {siteContent.join.ctaSecondary}
              </motion.button>
            </div>
          </GlassPanel>
        </div>
      </section>

      <EmailSubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
