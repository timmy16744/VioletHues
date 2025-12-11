"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Emma & James",
    occasion: "Wedding",
    quote: "Chiara understood exactly what we wanted for our big day. The flowers were beyond anything we could have imagined - romantic, elegant, and absolutely perfect.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sarah Mitchell",
    occasion: "Birthday Celebration",
    quote: "I've never seen my mother so happy! The arrangement was beautiful and lasted for weeks. The personal touch made it extra special.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "The Anderson Family",
    occasion: "Memorial Service",
    quote: "During such a difficult time, Chiara created the most thoughtful and beautiful tribute. Her kindness and artistry meant everything to us.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-violet-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-700/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-violet-800 text-violet-200 text-sm font-medium rounded-full mb-4">
            Kind Words
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
            What My Clients Say
          </h2>
          <p className="text-violet-300 max-w-2xl mx-auto">
            It&apos;s an honour to be part of your special moments. Here&apos;s what some
            of my wonderful clients have shared.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-violet-900/50 backdrop-blur-sm p-8 rounded-3xl border border-violet-800/50"
            >
              <Quote className="w-10 h-10 text-violet-500 mb-4" />
              <p className="text-violet-100 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet-500"
                  />
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-violet-400">{testimonial.occasion}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-violet-400 text-violet-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
