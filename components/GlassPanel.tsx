"use client"

import type React from "react"

import { motion } from "framer-motion"

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function GlassPanel({ children, className = "", delay = 0 }: GlassPanelProps) {
  return (
    <motion.div
      className={`backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
