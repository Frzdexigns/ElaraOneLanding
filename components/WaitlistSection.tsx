"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import EmailSubscriptionModal from "./EmailSubscriptionModal"

export default function FooterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <footer className="relative py-16 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <motion.h3
                className="text-3xl font-orbitron text-white mb-4 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                ELARAONE
              </motion.h3>
              <motion.p
                className="text-white/60 font-inter leading-relaxed mb-6 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                The AI-native infrastructure powering intelligent, evolving, and verifiable NFTs. Built for creators.
                Designed for scale.
              </motion.p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 border-2 border-accent-green text-white font-orbitron text-sm tracking-wider hover:bg-accent-green hover:text-black transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  JOIN THE MISSION
                </motion.button>

                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-orbitron text-sm tracking-wider hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  BUILD WITH US
                </motion.button>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <motion.h4
                className="text-lg font-orbitron text-white mb-4 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                RESOURCES
              </motion.h4>
              <motion.ul
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    Vision Paper
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    Mirror Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    Careers <span className="text-xs">(coming soon)</span>
                  </a>
                </li>
              </motion.ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <motion.h4
                className="text-lg font-orbitron text-white mb-4 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                COMMUNITY
              </motion.h4>
              <motion.ul
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 font-inter hover:text-accent-green transition-colors">
                    GitHub
                  </a>
                </li>
              </motion.ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <motion.div
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <motion.div
                className="w-2 h-2 bg-accent-green/40 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <p className="text-white/40 font-inter text-sm">© 2024 ElaraOne. All rights reserved.</p>
            </div>

            <div className="flex space-x-6 text-sm font-inter text-white/40">
              <a href="#" className="hover:text-accent-green/60 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent-green/60 transition-colors">
                Terms of Service
              </a>
            </div>
          </motion.div>

          {/* Subtle background decoration */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent-green/20 to-transparent" />
        </div>
      </footer>

      <EmailSubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
