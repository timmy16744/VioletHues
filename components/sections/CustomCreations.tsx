'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function CustomCreations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occasion: '',
    style: '',
    budget: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="custom" ref={ref} className="py-24 px-6 bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-violet-900 mb-4">
            Custom Creations
          </h2>
          <p className="text-xl text-violet-600 max-w-2xl mx-auto">
            Let&apos;s bring your floral vision to life. Share your ideas and we&apos;ll craft something uniquely yours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-violet-900 mb-2">
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none transition-colors bg-white/50"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-violet-900 mb-2">
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none transition-colors bg-white/50"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              <div>
                <label htmlFor="occasion" className="block text-sm font-semibold text-violet-900 mb-2">
                  Occasion
                </label>
                <motion.select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none transition-colors bg-white/50"
                  whileFocus={{ scale: 1.02 }}
                  required
                >
                  <option value="">Select an occasion</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="just-because">Just Because</option>
                  <option value="other">Other</option>
                </motion.select>
              </div>

              <div>
                <label htmlFor="style" className="block text-sm font-semibold text-violet-900 mb-2">
                  Preferred Style
                </label>
                <motion.select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none transition-colors bg-white/50"
                  whileFocus={{ scale: 1.02 }}
                  required
                >
                  <option value="">Select a style</option>
                  <option value="ethereal">Ethereal Garden</option>
                  <option value="bold">Bold & Beautiful</option>
                  <option value="minimalist">Minimalist Elegance</option>
                  <option value="wild">Wild Romance</option>
                  <option value="sunset">Sunset Dreams</option>
                  <option value="urban">Urban Jungle</option>
                </motion.select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-violet-900 mb-2">
                  Budget Range
                </label>
                <motion.select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none transition-colors bg-white/50"
                  whileFocus={{ scale: 1.02 }}
                  required
                >
                  <option value="">Select your budget</option>
                  <option value="100-250">$100 - $250</option>
                  <option value="250-500">$250 - $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000+">$1,000+</option>
                </motion.select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-violet-900 mb-2">
                  Tell Us About Your Vision
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none transition-colors bg-white/50 resize-none"
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Describe colors, flowers, or mood you're envisioning..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-violet-600 text-white rounded-full font-semibold text-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Request
              </motion.button>
            </form>
          </motion.div>

          {/* Preview Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full h-[600px]">
              {/* Animated Preview Card */}
              <motion.div
                className="absolute inset-0 glass rounded-2xl p-8 flex flex-col justify-center items-center"
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  className="text-center"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-300 to-pink-300 flex items-center justify-center">
                    <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-violet-900 mb-4">
                    Your Custom Design
                  </h3>
                  <p className="text-violet-600 text-lg">
                    Fill out the form to see your floral vision come to life
                  </p>
                </motion.div>

                {/* Floating Petals */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-violet-400/30 to-pink-400/30 blur-sm"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.sin(i) * 10, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
