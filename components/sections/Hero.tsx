'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const petalsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP bloom animation
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.hero-title', {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        })

        gsap.from('.hero-subtitle', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.8,
        })

        gsap.from('.hero-cta', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          delay: 1.2,
        })
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  // Generate floating petals
  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 4,
    size: 20 + Math.random() * 30,
  }))

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-petal-lilac to-violet-100"
    >
      {/* Animated Background Petals */}
      <div ref={petalsRef} className="absolute inset-0 pointer-events-none">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute rounded-full bg-gradient-to-br from-violet-300/30 to-pink-300/30 blur-xl"
            style={{
              left: `${petal.left}%`,
              top: '-10%',
              width: petal.size,
              height: petal.size,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.sin(petal.id) * 100],
              rotate: [0, 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Gradient Mesh Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Decorative Element */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'backOut' }}
        >
          <svg className="w-20 h-20 text-violet-600" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 20 C30 20 20 40 20 50 C20 60 30 70 50 70 C70 70 80 60 80 50 C80 40 70 20 50 20Z"
              fill="currentColor"
              opacity="0.2"
            />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <path
              d="M50 30 L55 45 L50 42 L45 45 Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M70 50 L55 55 L58 50 L55 45 Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M50 70 L45 55 L50 58 L55 55 Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M30 50 L45 45 L42 50 L45 55 Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        <h1 className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-violet-900 mb-6 leading-tight">
          Violet Hues
        </h1>

        <p className="hero-subtitle text-2xl md:text-3xl text-violet-700 mb-4 font-light">
          Where Design Blooms
        </p>

        <p className="hero-subtitle text-lg md:text-xl text-violet-600 mb-12 max-w-2xl mx-auto">
          Floral artistry reimagined for the modern era
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="#collections"
            className="hero-cta glass px-8 py-4 rounded-full text-violet-900 font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Arrangements
          </motion.a>
          <motion.a
            href="#studio"
            className="hero-cta bg-violet-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Meet Violet
          </motion.a>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-10 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
