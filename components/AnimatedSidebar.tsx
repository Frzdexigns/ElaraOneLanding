"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Vision", href: "#vision" },
  { name: "Phases", href: "#phases" },
  { name: "Technology", href: "#technology" },
  { name: "Story", href: "#story" },
]

export default function AnimatedSidebar({ isOpen, onClose }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    if (isOpen) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      onClose()
    }
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md"
          initial={{
            opacity: 0,
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          }}
          animate={{
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          exit={{
            opacity: 0,
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:text-accent-green transition-colors z-50"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>

          {/* Navigation Menu */}
          <div
            className="flex flex-col items-center justify-center h-full space-y-8 px-8"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold tracking-wider transition-all duration-300 hover:text-accent-green ${
                  activeSection === item.href.substring(1) ? "text-accent-green" : "text-white"
                }`}
                initial={{
                  opacity: 0,
                  y: 50,
                  x: 100,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  x: 100,
                }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  scale: 1.05,
                  x: 10,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}

            {/* Decorative line */}
            <motion.div
              className="w-32 h-px bg-gradient-to-r from-transparent via-accent-green to-transparent mt-12"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />

            {/* Social links or additional info */}
            <motion.div
              className="flex space-x-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              {["Twitter", "Discord", "Mirror"].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-white/60 hover:text-accent-green font-orbitron text-sm tracking-wider transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
