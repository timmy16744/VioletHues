'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const collections = [
  {
    id: 1,
    title: 'Ethereal Garden',
    description: 'Soft pastels and delicate blooms',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=800&fit=crop',
    price: 'From $95',
  },
  {
    id: 2,
    title: 'Bold & Beautiful',
    description: 'Vibrant statement pieces',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=800&fit=crop',
    price: 'From $120',
  },
  {
    id: 3,
    title: 'Minimalist Elegance',
    description: 'Less is more',
    image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=800&fit=crop',
    price: 'From $85',
  },
  {
    id: 4,
    title: 'Wild Romance',
    description: 'Untamed beauty',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=800&fit=crop',
    price: 'From $110',
  },
  {
    id: 5,
    title: 'Sunset Dreams',
    description: 'Warm tones and golden hour',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=800&fit=crop',
    price: 'From $100',
  },
  {
    id: 6,
    title: 'Urban Jungle',
    description: 'Modern greenery',
    image: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=600&h=800&fit=crop',
    price: 'From $90',
  },
]

export function FeaturedCollections() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="collections" className="py-20 px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Curated arrangements that blend artistry with nature&apos;s finest blooms
          </p>
        </motion.div>

        {/* Even Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white border border-stone-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Below Image */}
              <div className="p-6">
                <h3 className="font-serif text-2xl text-stone-900 mb-2">
                  {collection.title}
                </h3>
                <p className="text-stone-600 mb-3">
                  {collection.description}
                </p>
                <p className="text-stone-900 font-semibold">
                  {collection.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            className="btn-primary hover:bg-stone-800 transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
