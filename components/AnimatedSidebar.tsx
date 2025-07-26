"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: "Home", href: "#hero", icon: "○" },
  { name: "About", href: "#about", icon: "◐" },
  { name: "Vision", href: "#vision", icon: "◑" },
  { name: "Phases", href: "#phases", icon: "◒" },
  { name: "Technology", href: "#technology", icon: "◓" },
  { name: "Story", href: "#story", icon: "●" },
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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-xl border-l border-accent-green/20 z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-8 border-b border-accent-green/10">
              <div className="flex items-center justify-between">
                <motion.h2
                  className="text-2xl font-bebas text-white tracking-wider"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NAVI<span className="text-accent-green">GATION</span>
                </motion.h2>
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 border border-accent-green/30 rounded-full flex items-center justify-center text-white hover:bg-accent-green/10 transition-colors"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-8">
              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 group ${
                      activeSection === item.href.substring(1)
                        ? "bg-accent-green/10 border border-accent-green/20 glow-green"
                        : "hover:bg-white/5 hover:border-accent-green/10 border border-transparent"
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.span
                      className={`text-xl ${
                        activeSection === item.href.substring(1) ? "text-accent-green" : "text-white/60"
                      }`}
                      animate={{
                        rotate: activeSection === item.href.substring(1) ? 360 : 0,
                        color: activeSection === item.href.substring(1) ? "#31c595" : "rgba(255,255,255,0.6)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span
                      className={`font-inter transition-colors ${
                        activeSection === item.href.substring(1) ? "text-accent-green" : "text-white"
                      } group-hover:text-accent-green/80`}
                    >
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div
                className="mt-12 pt-8 border-t border-accent-green/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-sm font-bebas text-white/60 mb-4 tracking-wider">
                  CON<span className="text-accent-green/60">NECT</span>
                </h3>
                <div className="flex space-x-4">
                  {["Twitter", "Discord", "Mirror"].map((social, index) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="text-white/40 hover:text-accent-green transition-colors text-sm font-inter"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Animated decoration */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-green/20 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
