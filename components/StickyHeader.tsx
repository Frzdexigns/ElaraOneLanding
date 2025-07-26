"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import MenuToggle from "./MenuToggle"

interface StickyHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function StickyHeader({ sidebarOpen, setSidebarOpen }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16 xs:h-18 sm:h-20 md:h-24">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 xs:space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Dummy Logo */}
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-green to-accent-green/60 rounded-lg flex items-center justify-center">
              <motion.div
                className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 bg-black rounded-sm"
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-white font-orbitron text-sm xs:text-base sm:text-lg md:text-xl tracking-wider">
                ELARA<span className="text-accent-green">ONE</span>
              </span>
              <span className="text-white/40 font-inter text-xs xs:text-xs sm:text-sm tracking-widest hidden xs:block">
                AI • NFT • FUTURE
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile */}
          <motion.nav
            className="hidden lg:flex items-center space-x-8 xl:space-x-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {["About", "Vision", "Phases", "Technology"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-accent-green font-inter text-sm xl:text-base tracking-wider transition-colors duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent-green origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.nav>

          {/* Mobile Menu Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <MenuToggle isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
          </motion.div>
        </div>
      </div>

      {/* Mobile-only tagline */}
      <motion.div
        className="block xs:hidden text-center pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white/30 font-inter text-xs tracking-widest">AI • NFT • FUTURE</span>
      </motion.div>
    </motion.header>
  )
}
