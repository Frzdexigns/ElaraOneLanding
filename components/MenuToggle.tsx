"use client"

import { motion } from "framer-motion"

interface MenuToggleProps {
  isOpen: boolean
  toggle: () => void
}

export default function MenuToggle({ isOpen, toggle }: MenuToggleProps) {
  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 xs:w-12 xs:h-12 flex items-center justify-center focus:outline-none"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="w-6 h-6 xs:w-7 xs:h-7 relative">
        {/* Top line */}
        <motion.span
          className="absolute left-0 block w-full h-0.5 bg-white transform origin-center"
          animate={
            isOpen
              ? {
                  rotate: 45,
                  y: 0,
                  top: "50%",
                }
              : {
                  rotate: 0,
                  y: 0,
                  top: "20%",
                }
          }
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ top: "20%" }}
        />

        {/* Middle line */}
        <motion.span
          className="absolute left-0 top-1/2 block w-full h-0.5 bg-white transform -translate-y-1/2"
          animate={
            isOpen
              ? {
                  opacity: 0,
                  x: -10,
                }
              : {
                  opacity: 1,
                  x: 0,
                }
          }
          transition={{ duration: 0.2 }}
        />

        {/* Bottom line */}
        <motion.span
          className="absolute left-0 block w-full h-0.5 bg-white transform origin-center"
          animate={
            isOpen
              ? {
                  rotate: -45,
                  y: 0,
                  bottom: "50%",
                }
              : {
                  rotate: 0,
                  y: 0,
                  bottom: "20%",
                }
          }
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ bottom: "20%" }}
        />
      </div>
    </button>
  )
}
