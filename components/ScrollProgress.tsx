"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-40"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgba(49, 197, 149, 0.6), rgba(49, 197, 149, 0.8), rgba(49, 197, 149, 0.6))",
      }}
    />
  )
}
