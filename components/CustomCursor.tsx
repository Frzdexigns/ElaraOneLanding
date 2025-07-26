"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState("")

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Handle hover states
    const handleHoverableEnter = (e: Event) => {
      const target = e.target as HTMLElement
      setIsHovering(true)

      if (target.dataset.cursorText) {
        setCursorText(target.dataset.cursorText)
      }
    }

    const handleHoverableLeave = () => {
      setIsHovering(false)
      setCursorText("")
    }

    // Add event listeners
    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Use a more robust selector for hoverable elements
    const updateHoverListeners = () => {
      const hoverableElements = document.querySelectorAll("button, a, [data-cursor-hover], [data-cursor-text]")
      hoverableElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverableEnter)
        el.addEventListener("mouseleave", handleHoverableLeave)
      })

      return () => {
        hoverableElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleHoverableEnter)
          el.removeEventListener("mouseleave", handleHoverableLeave)
        })
      }
    }

    // Initial setup
    let cleanup = updateHoverListeners()

    // Re-setup listeners when DOM changes (for lazy loaded content)
    const observer = new MutationObserver(() => {
      cleanup()
      cleanup = updateHoverListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cleanup()
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  // Don't render on touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setIsVisible(false)
    }
  }, [])

  // Reset cursor to default for all elements
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      * {
        cursor: default !important;
      }
      button, a, [role="button"] {
        cursor: pointer !important;
      }
      input, textarea {
        cursor: text !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 999999 }}>
      {/* Main cursor */}
      <motion.div
        className="absolute w-8 h-8 pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          zIndex: 999999,
        }}
        animate={{
          scale: isVisible ? (isHovering ? 1.5 : 1) : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative mix-blend-difference">
          {cursorText && (
            <span className="text-xs font-bebas text-black whitespace-nowrap absolute -top-8 left-1/2 transform -translate-x-1/2 mix-blend-normal bg-white px-2 py-1 rounded">
              {cursorText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="absolute w-2 h-2 bg-white/40 rounded-full pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "6px",
          translateY: "6px",
          zIndex: 999998,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          scale: { duration: 0.4, delay: 0.1 },
          opacity: { duration: 0.4, delay: 0.1 },
        }}
      />

      {/* Accent ring with subtle green */}
      <motion.div
        className="absolute w-12 h-12 border border-accent-green/30 rounded-full pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-8px",
          translateY: "-8px",
          zIndex: 999997,
        }}
        animate={{
          scale: isVisible ? (isHovering ? 1.2 : 0.8) : 0,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{
          scale: { duration: 0.3 },
          opacity: { duration: 0.3 },
        }}
      />
    </div>
  )
}
