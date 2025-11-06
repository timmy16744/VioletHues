'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Studio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="studio" ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image First */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=1000&fit=crop"
                alt="Violet Hues Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Our Studio
            </h2>

            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              At Violet Hues, every arrangement is thoughtfully crafted with passion and precision.
              We combine traditional techniques with contemporary design sensibilities.
            </p>

            <p className="text-base text-stone-600 mb-8 leading-relaxed">
              We source seasonal blooms from local growers and sustainable farms,
              ensuring every creation is as eco-conscious as it is beautiful.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-stone-200">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-3xl font-serif text-stone-900 mb-1">500+</div>
                <div className="text-sm text-stone-600">Designs Created</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-3xl font-serif text-stone-900 mb-1">50+</div>
                <div className="text-sm text-stone-600">Local Growers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-3xl font-serif text-stone-900 mb-1">100%</div>
                <div className="text-sm text-stone-600">Sustainable</div>
              </motion.div>
            </div>

            <motion.button
              className="btn-primary hover:bg-stone-800 transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
