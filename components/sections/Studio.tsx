'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export function Studio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id="studio" ref={ref} className="py-24 px-6 bg-violet-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-violet-800/50 rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-violet-200 font-semibold">The Studio</span>
            </motion.div>

            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Where Magic Happens
            </h2>

            <p className="text-xl text-violet-100 mb-6 leading-relaxed">
              Step behind the scenes at Violet Hues Studio, where creativity blooms daily.
              Each arrangement is thoughtfully crafted with passion, precision, and an eye for the extraordinary.
            </p>

            <p className="text-lg text-violet-200 mb-8 leading-relaxed">
              Founded by floral artist Violet Hues, our studio combines traditional techniques
              with contemporary design sensibilities. We source seasonal blooms from local growers
              and sustainable farms, ensuring every creation is as eco-conscious as it is beautiful.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-violet-300 mb-2">500+</div>
                <div className="text-sm text-violet-200">Designs Created</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-4xl font-bold text-violet-300 mb-2">50+</div>
                <div className="text-sm text-violet-200">Local Growers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-4xl font-bold text-violet-300 mb-2">100%</div>
                <div className="text-sm text-violet-200">Sustainable</div>
              </motion.div>
            </div>

            <motion.button
              className="px-8 py-4 bg-white text-violet-900 rounded-full font-semibold text-lg hover:bg-violet-50 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.button>
          </motion.div>

          {/* Image with Parallax */}
          <motion.div
            style={{ y, opacity }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div
                className="w-full h-[600px] bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=1200&fit=crop)',
                }}
              />

              {/* Glassmorphic Overlay Card */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 glass-dark p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-violet-100 italic text-lg">
                  &quot;Every bloom tells a story, every arrangement is a masterpiece waiting to unfold.&quot;
                </p>
                <p className="text-violet-300 font-semibold mt-2">— Violet Hues</p>
              </motion.div>
            </motion.div>

            {/* Decorative Floating Element */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-violet-400 rounded-full blur-3xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
