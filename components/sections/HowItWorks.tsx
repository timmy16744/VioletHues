'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Choose Your Style',
    description: 'Select flowers, colors, and arrangement styles from our curated options or create your own.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: 'from-violet-400 to-purple-500',
  },
  {
    number: '02',
    title: 'AI Creates Magic',
    description: 'Our AI generates a photorealistic bouquet in seconds, perfectly matching your vision.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-pink-400 to-rose-500',
  },
  {
    number: '03',
    title: 'Get Your Quote',
    description: 'Instantly see detailed pricing, flower quantities, and download your design to share or order.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-violet-400 to-indigo-500',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-4">
            Simple & Fast
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-violet-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-violet-600 max-w-2xl mx-auto">
            Create professional floral designs in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-violet-300 to-transparent -translate-x-1/2 z-0" />
              )}

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white to-violet-50/50 rounded-3xl p-8 border-2 border-violet-100 hover:border-violet-300 transition-all duration-300 hover:shadow-xl group">
                {/* Number Badge */}
                <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-bold text-violet-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-violet-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/5 group-hover:to-pink-500/5 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-violet-600 mb-6">Ready to create your perfect bouquet?</p>
          <motion.button
            onClick={() => {
              const aiSection = document.getElementById('ai-atelier')
              aiSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 bg-violet-600 text-white rounded-full font-semibold text-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Try AI Designer Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
