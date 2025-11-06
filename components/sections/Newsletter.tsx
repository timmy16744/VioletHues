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
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Stay Updated
          </h2>

          <p className="text-lg text-stone-600 mb-10 max-w-xl mx-auto">
            Subscribe to receive seasonal collections and floral inspiration
          </p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none text-stone-900 placeholder-stone-400"
                required
              />
              <button
                type="submit"
                className="btn-primary hover:bg-stone-800 transition-colors duration-300 whitespace-nowrap"
              >
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </motion.form>

          {/* Privacy Note */}
          <motion.p
            className="text-xs text-stone-500 mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>

          {/* Success Message */}
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <p className="text-sage-700 font-medium">Thank you for subscribing</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
