"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  isHeadline?: boolean
  accentWord?: string
}

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  isHeadline = false,
  accentWord,
}: AnimatedTextProps) {
  const words = text.split(" ")

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={`inline-block mr-2 ${isHeadline ? "font-bebas" : "font-inter"} ${
            accentWord && word.toLowerCase().includes(accentWord.toLowerCase()) ? "text-accent-green" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * 0.1,
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
