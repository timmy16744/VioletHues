'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Bride',
    text: 'Violet Hues transformed our wedding into a floral wonderland. Every detail was perfect.',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Event Planner',
    text: 'Their creativity and professionalism make every event spectacular.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Corporate Client',
    text: 'The custom arrangements for our office brought so much life and energy.',
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Hear from those who have experienced our floral designs
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 border border-stone-200"
            >
              <p className="text-stone-700 leading-relaxed mb-6 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="border-t border-stone-200 pt-4">
                <div className="font-semibold text-stone-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-stone-600">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {['Vogue', 'Martha Stewart', 'The Knot', 'Brides'].map((brand) => (
              <div key={brand} className="font-serif text-xl text-stone-900">
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
