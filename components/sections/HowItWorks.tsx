'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Design Your Vision',
    description: 'Use our tool to visualize your perfect bouquet. Pick your favorite flowers, colors, and style.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Handcraft It',
    description: 'Our florists recreate your exact design using fresh, locally-sourced blooms.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'You Receive It',
    description: 'Get the exact bouquet you designed, delivered fresh to your door. What you see is what you get.',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Your Vision, Our Craft
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Three simple steps from design to delivery
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Card */}
              <div className="bg-white rounded-lg p-8 border border-stone-200 hover:shadow-lg transition-all duration-300">
                {/* Number */}
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-semibold text-lg mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 text-stone-700 mb-6">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl text-stone-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => {
              const aiSection = document.getElementById('ai-atelier')
              aiSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary hover:bg-stone-800 transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Designing
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
