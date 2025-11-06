'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const DEMO_IMAGES = [
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=800&fit=crop',
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    // GSAP animations
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.hero-badge', {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out',
          delay: 0.2,
        })

        gsap.from('.hero-title', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.4,
        })

        gsap.from('.hero-subtitle', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.7,
        })

        gsap.from('.hero-features', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.9,
        })

        gsap.from('.hero-cta', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 1.2,
        })

        gsap.from('.hero-image-container', {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.5,
        })
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % DEMO_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToAI = () => {
    const aiSection = document.getElementById('ai-atelier')
    aiSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-pink-50"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-violet-400 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-0 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="hero-badge inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full text-sm font-semibold shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI-Powered Design
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="hero-title font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-violet-900 mb-6 leading-tight">
              Design Your Dream Bouquet
              <span className="block bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                with AI Magic
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-xl md:text-2xl text-violet-700 mb-8 leading-relaxed">
              Where technology meets artistry. Create stunning, personalized floral arrangements in seconds with our revolutionary AI designer.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-10">
              {[
                '🎨 Instant AI generation',
                '💰 Real-time pricing',
                '📸 Upload inspiration photos',
                '✨ Unlimited customization'
              ].map((feature, i) => (
                <div key={i} className="hero-features flex items-center justify-center lg:justify-start gap-2 text-violet-600">
                  <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={scrollToAI}
                className="hero-cta group relative px-8 py-4 bg-violet-600 text-white rounded-full font-semibold text-lg hover:bg-violet-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Creating Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                onClick={scrollToAI}
                className="hero-cta px-8 py-4 bg-white border-2 border-violet-600 text-violet-600 rounded-full font-semibold text-lg hover:bg-violet-50 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-violet-600"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 border-2 border-white" />
                ))}
              </div>
              <p>
                <span className="font-bold text-violet-900">10,000+</span> bouquets designed
              </p>
            </motion.div>
          </div>

          {/* Right Column - AI Preview */}
          <div className="relative hero-image-container">
            <div className="relative">
              {/* Main Image Card */}
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="aspect-[3/4] relative">
                  {DEMO_IMAGES.map((img, idx) => (
                    <motion.img
                      key={img}
                      src={img}
                      alt={`Bouquet example ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentImage === idx ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}

                  {/* AI Badge Overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-violet-900">AI Generated</span>
                  </div>

                  {/* Quick Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-2xl font-bold text-violet-900">2s</div>
                        <div className="text-xs text-violet-600">Generated</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-violet-900">12</div>
                        <div className="text-xs text-violet-600">Flowers</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-violet-900">$89</div>
                        <div className="text-xs text-violet-600">Estimated</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full blur-2xl opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-300 to-violet-300 rounded-full blur-2xl opacity-60"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-violet-600">
          <span className="text-sm font-medium">Try the AI Designer</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
