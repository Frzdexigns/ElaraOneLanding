"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  delay?: number
}

export default function FlipCard({ front, back, className = "", delay = 0 }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`relative w-full h-full cursor-pointer ${className}`}
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <motion.div className="absolute inset-0 w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          {front}
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
