'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero (more than 80vh)
      const scrollPosition = window.scrollY
      const heroHeight = window.innerHeight * 0.8

      // Hide if we're in the AI Atelier section
      const aiSection = document.getElementById('ai-atelier')
      if (aiSection) {
        const rect = aiSection.getBoundingClientRect()
        const isInAISection = rect.top < window.innerHeight && rect.bottom > 0
        setIsVisible(scrollPosition > heroHeight && !isInAISection)
      } else {
        setIsVisible(scrollPosition > heroHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const aiSection = document.getElementById('ai-atelier')
    aiSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 group"
        >
          <div className="relative">
            {/* Main Button */}
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden sm:inline">Try AI Designer</span>
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />

            {/* Ping Animation */}
            <div className="absolute top-0 right-0 -mt-1 -mr-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
