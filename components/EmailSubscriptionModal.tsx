"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface EmailSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EmailSubscriptionModal({ isOpen, onClose }: EmailSubscriptionModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device with custom breakpoints
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.width = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.width = "unset"
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const delay = isMobile ? 800 : 2000
    await new Promise((resolve) => setTimeout(resolve, delay))

    setIsSubmitting(false)
    setIsSubmitted(true)

    const autoCloseDelay = isMobile ? 1500 : 3000
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      setEmail("")
    }, autoCloseDelay)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  // Minimal animations for mobile
  const containerVariants = isMobile
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }

  const modalVariants = isMobile
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, y: 50 },
      }

  const transition = isMobile
    ? { duration: 0.1, ease: "easeOut" }
    : { type: "spring", damping: 25, stiffness: 300, duration: 0.3 }

  const contentTransition = isMobile ? { duration: 0.05, ease: "easeOut" } : { duration: 0.3, ease: "easeOut" }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4 xs:p-3 sm:p-4 md:p-6"
          style={{ zIndex: 10000 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: isMobile ? 0.1 : 0.2 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/85 ${isMobile ? "" : "backdrop-blur-md"}`} />

          {/* Modal Content */}
          <motion.div
            className="relative bg-black/95 border border-accent-green/30 rounded-lg xs:rounded-xl w-full max-w-xs xs:max-w-sm sm:max-w-md shadow-2xl mx-auto p-4 xs:p-5 sm:p-6 md:p-8"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              backdropFilter: isMobile ? "none" : "blur(20px)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-accent-green/20 transition-colors z-10 text-sm xs:text-base sm:text-lg"
              aria-label="Close modal"
            >
              ×
            </button>

            {!isSubmitted ? (
              <>
                <motion.h2
                  className="text-lg xs:text-xl sm:text-2xl font-orbitron text-white mb-2 tracking-wider pr-6 xs:pr-8 sm:pr-12"
                  initial={isMobile ? {} : { opacity: 0, y: -20 }}
                  animate={isMobile ? {} : { opacity: 1, y: 0 }}
                  transition={isMobile ? {} : { delay: 0.1, ...contentTransition }}
                >
                  JOIN THE <span className="text-accent-green">MISSION</span>
                </motion.h2>

                <motion.p
                  className="text-white/60 font-inter mb-4 xs:mb-5 sm:mb-6 text-xs xs:text-sm sm:text-base leading-relaxed"
                  initial={isMobile ? {} : { opacity: 0, y: -10 }}
                  animate={isMobile ? {} : { opacity: 1, y: 0 }}
                  transition={isMobile ? {} : { delay: 0.2, ...contentTransition }}
                >
                  Be the first to know about ElaraOne updates, early access, and exclusive content.
                </motion.p>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-3 xs:space-y-4"
                  initial={isMobile ? {} : { opacity: 0, y: 20 }}
                  animate={isMobile ? {} : { opacity: 1, y: 0 }}
                  transition={isMobile ? {} : { delay: 0.3, ...contentTransition }}
                >
                  <div>
                    <label htmlFor="email" className="block text-xs xs:text-sm font-inter text-white/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus={!isMobile}
                      autoComplete="email"
                      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/20 transition-colors text-sm xs:text-base"
                      placeholder="your@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 bg-accent-green text-black font-orbitron text-xs xs:text-sm tracking-wider rounded-lg hover:bg-accent-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-green/50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 xs:w-4 xs:h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>JOINING...</span>
                      </div>
                    ) : (
                      "JOIN THE MISSION"
                    )}
                  </button>
                </motion.form>

                <motion.p
                  className="text-xs text-white/40 font-inter mt-3 xs:mt-4 text-center"
                  initial={isMobile ? {} : { opacity: 0 }}
                  animate={isMobile ? {} : { opacity: 1 }}
                  transition={isMobile ? {} : { delay: 0.4, ...contentTransition }}
                >
                  We respect your privacy. Unsubscribe at any time.
                </motion.p>
              </>
            ) : (
              <div className="text-center py-4 xs:py-5 sm:py-6">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                  <svg
                    className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-orbitron text-accent-green mb-2">
                  WELCOME ABOARD!
                </h3>
                <p className="text-white/60 font-inter text-xs xs:text-sm sm:text-base">
                  You're now part of the ElaraOne mission. Check your email for confirmation.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
