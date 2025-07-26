"use client"

import { motion } from "framer-motion"

interface MenuToggleProps {
  isOpen: boolean
  toggle: () => void
}

export default function MenuToggle({ isOpen, toggle }: MenuToggleProps) {
  return (
    <motion.button
      onClick={toggle}
      className="relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:border-accent-green/40 glow-green-hover transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle menu"
    >
      <div className="w-5 h-5 xs:w-6 xs:h-6 flex flex-col justify-center items-center">
        <motion.span
          className="w-4 xs:w-5 h-0.5 bg-white block"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 1 : -2,
            backgroundColor: isOpen ? "#31c595" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-4 xs:w-5 h-0.5 bg-white block mt-1"
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-4 xs:w-5 h-0.5 bg-white block mt-1"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -1 : 2,
            backgroundColor: isOpen ? "#31c595" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  )
}
