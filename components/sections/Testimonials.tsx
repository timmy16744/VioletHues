'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Bride',
    text: 'Violet Hughes transformed our wedding into a floral wonderland. Every detail was perfect, and the arrangements exceeded our wildest dreams.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Event Planner',
    text: 'Working with Violet Hughes is always a pleasure. Their creativity and professionalism make every event spectacular.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Corporate Client',
    text: 'The custom arrangements for our office space brought so much life and energy. Our team absolutely loves them!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Thompson',
    role: 'Anniversary Gift',
    text: 'I wanted something special for my wife, and Violet Hughes delivered beyond expectations. The arrangement was a work of art.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-white to-violet-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-violet-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-violet-600 max-w-2xl mx-auto">
            Hear from those who&apos;ve experienced the Violet Hughes magic
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="w-full max-w-4xl"
              >
                <div className="glass rounded-3xl p-12 shadow-2xl">
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className="w-8 h-8 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <motion.p
                    className="text-2xl md:text-3xl text-violet-900 font-serif italic text-center mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    &quot;{testimonials[currentIndex].text}&quot;
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full bg-cover bg-center ring-4 ring-violet-300"
                      style={{ backgroundImage: `url(${testimonials[currentIndex].image})` }}
                    />
                    <div className="text-left">
                      <div className="font-semibold text-lg text-violet-900">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-violet-600">
                        {testimonials[currentIndex].role}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-violet-600 w-8'
                      : 'bg-violet-300 hover:bg-violet-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Press Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-violet-600 uppercase tracking-wider mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {['Vogue', 'Martha Stewart', 'The Knot', 'Brides'].map((brand) => (
              <div key={brand} className="font-serif text-2xl font-bold text-violet-900">
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
