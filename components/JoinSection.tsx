"use client"

import { motion } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import AnimatedText from "./AnimatedText"

export default function JoinSection() {
  return (
    <section className="relative py-32 px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedText
          text={siteContent.join.title}
          className="text-5xl md:text-7xl font-bebas text-white mb-6"
          isHeadline={true}
        />

        <AnimatedText
          text={siteContent.join.subtitle}
          className="text-xl md:text-2xl font-inter text-white/60 mb-8"
          delay={0.3}
        />

        <motion.p
          className="text-lg font-inter text-white/80 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {siteContent.join.description}
        </motion.p>

        <motion.button
          className="px-12 py-6 border-2 border-white text-white font-bebas text-2xl tracking-wider hover:bg-white hover:text-black transition-all duration-500 relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative z-10 group-hover:text-black transition-colors duration-500">
            {siteContent.join.cta}
          </span>
        </motion.button>

        {/* Final mysterious element */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4" />
          <p className="text-white/30 font-inter text-xs tracking-[0.2em]">ELARAONE • 2024</p>
        </motion.div>
      </div>
    </section>
  )
}
