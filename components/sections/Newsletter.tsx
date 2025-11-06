'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 3000)
  }

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-br from-violet-100 via-petal-lilac to-petal-pink relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/50 backdrop-blur-sm mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>

          <h2 className="font-serif text-5xl md:text-6xl font-bold text-violet-900 mb-6">
            Join the Bloom
          </h2>

          <p className="text-xl text-violet-700 mb-10 max-w-2xl mx-auto">
            Subscribe to receive exclusive offers, floral inspiration, and seasonal collections delivered to your inbox
          </p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-white/50 bg-white/70 backdrop-blur-sm focus:border-violet-500 focus:outline-none text-violet-900 placeholder-violet-400"
                whileFocus={{ scale: 1.02 }}
                required
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-violet-600 text-white rounded-full font-semibold text-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </motion.button>
            </div>
          </motion.form>

          {/* Privacy Note */}
          <motion.p
            className="text-sm text-violet-600 mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>

          {/* Success Animation */}
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="mt-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-violet-900 font-semibold">Thank you for joining!</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
