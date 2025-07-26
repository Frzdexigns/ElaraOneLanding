"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

interface PremiumGlassPanelProps {
  children: React.ReactNode
  className?: string
  delay?: number
  enableTilt?: boolean
  accentBorder?: boolean
}

export default function PremiumGlassPanel({
  children,
  className = "",
  delay = 0,
  enableTilt = true,
  accentBorder = false,
}: PremiumGlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const borderClass = accentBorder
    ? "border border-accent-green/20 hover:border-accent-green/40"
    : "border border-white/20 hover:border-white/40"

  return (
    <motion.div
      ref={ref}
      className={`backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 ${borderClass} rounded-xl shadow-2xl ${className}`}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        boxShadow: accentBorder
          ? "0 25px 50px -12px rgba(49, 197, 149, 0.1)"
          : "0 25px 50px -12px rgba(255, 255, 255, 0.1)",
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{
          background: accentBorder
            ? "radial-gradient(circle at center, rgba(49, 197, 149, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
