'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const collections = [
  {
    id: 1,
    title: 'Ethereal Garden',
    description: 'Soft pastels and delicate blooms',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=800&fit=crop',
    span: 'row-span-2',
  },
  {
    id: 2,
    title: 'Bold & Beautiful',
    description: 'Vibrant statement pieces',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop',
    span: 'row-span-1',
  },
  {
    id: 3,
    title: 'Minimalist Elegance',
    description: 'Less is more',
    image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=600&fit=crop',
    span: 'row-span-1',
  },
  {
    id: 4,
    title: 'Wild Romance',
    description: 'Untamed beauty',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=800&fit=crop',
    span: 'row-span-2',
  },
  {
    id: 5,
    title: 'Sunset Dreams',
    description: 'Warm tones & golden hour',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=600&fit=crop',
    span: 'row-span-1',
  },
  {
    id: 6,
    title: 'Urban Jungle',
    description: 'Modern greenery',
    image: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=600&h=600&fit=crop',
    span: 'row-span-1',
  },
]

export function FeaturedCollections() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="collections" className="py-24 px-6 bg-gradient-to-b from-white to-violet-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-violet-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-violet-600 max-w-2xl mx-auto">
            Curated arrangements that blend artistry with nature&apos;s finest blooms
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative ${collection.span} rounded-2xl overflow-hidden cursor-pointer`}
            >
              {/* Image with Hover Zoom */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${collection.image})` }}
                whileHover={{ scale: 1.1 }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-violet-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.h3
                  className="font-serif text-2xl md:text-3xl font-bold text-white mb-2"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {collection.title}
                </motion.h3>
                <motion.p
                  className="text-violet-100 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  {collection.description}
                </motion.p>

                {/* Hover Button */}
                <motion.button
                  className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30 self-start"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Collection
                </motion.button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            className="px-10 py-4 bg-violet-600 text-white rounded-full font-semibold text-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
