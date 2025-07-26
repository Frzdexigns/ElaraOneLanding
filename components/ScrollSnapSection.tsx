"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ScrollSnapSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function ScrollSnapSection({ children, className = "", id }: ScrollSnapSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`min-h-screen snap-start snap-always flex items-center justify-center ${className}`}
      style={{ opacity, scale, y }}
    >
      {children}
    </motion.section>
  )
}
