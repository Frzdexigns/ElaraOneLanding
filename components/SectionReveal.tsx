"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  id?: string
  delay?: number
}

export default function SectionReveal({ children, className = "", id, delay = 0 }: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px -10% 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`min-h-screen snap-start snap-always flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: 100 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="w-full"
        initial={{ scale: 0.9 }}
        animate={isVisible ? { scale: 1 } : { scale: 0.9 }}
        transition={{
          duration: 1.2,
          delay: delay + 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}
