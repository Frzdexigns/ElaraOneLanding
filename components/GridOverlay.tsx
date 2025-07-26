"use client"

import { motion } from "framer-motion"

export default function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Vertical lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-white/10"
          style={{ left: `${(i + 1) * 8.33}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: i * 0.1, duration: 1 }}
        />
      ))}

      {/* Horizontal lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-white/5"
          style={{ top: `${(i + 1) * 12.5}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: i * 0.15, duration: 1.2 }}
        />
      ))}
    </div>
  )
}
