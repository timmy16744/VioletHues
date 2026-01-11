"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "Emma & James",
    occasion: "Wedding",
    quote: "Chiara understood exactly what we wanted for our big day. The flowers were beyond anything we could have imagined — romantic, elegant, and absolutely perfect.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=200&h=200&fit=crop&crop=face&q=90",
  },
  {
    name: "Sarah Mitchell",
    occasion: "Birthday Celebration",
    quote: "I've never seen my mother so happy! The arrangement was beautiful and lasted for weeks. The personal touch made it extra special.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=90",
  },
  {
    name: "The Anderson Family",
    occasion: "Memorial Service",
    quote: "During such a difficult time, Chiara created the most thoughtful and beautiful tribute. Her kindness and artistry meant everything to us.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=90",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.15 + i * 0.12,
    },
  }),
};

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full bg-ivory p-8 lg:p-10 border border-noir/5 relative"
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-champagne/0 group-hover:border-champagne/30 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-champagne/0 group-hover:border-champagne/30 transition-colors duration-500" />

        {/* Quote mark */}
        <div className="mb-6">
          <span className="font-serif text-6xl text-champagne/20 leading-none">"</span>
        </div>

        {/* Quote text */}
        <p className="font-serif text-xl lg:text-2xl text-noir/80 leading-relaxed mb-8 italic">
          {testimonial.quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-6 border-t border-noir/5">
          <motion.div
            className="relative w-14 h-14 rounded-full overflow-hidden"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-champagne/20 rounded-full" />
          </motion.div>
          <div>
            <p className="font-medium text-noir">{testimonial.name}</p>
            <p className="text-xs tracking-[0.15em] uppercase text-taupe">
              {testimonial.occasion}
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-champagne"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-luxe bg-blush relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201, 169, 98, 0.15) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container-luxe relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-champagne" />
            <span className="text-xs tracking-[0.3em] uppercase text-taupe">
              Kind Words
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-champagne" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-light text-noir leading-tight mb-6">
            Stories from
            <span className="text-champagne italic"> Our Clients</span>
          </h2>
          <p className="text-taupe text-lg leading-relaxed">
            It&apos;s an honour to be part of your special moments.
            Here&apos;s what some of our wonderful clients have shared.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 lg:mt-24 flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-champagne mb-2">200+</p>
            <p className="text-xs tracking-[0.2em] uppercase text-taupe">Weddings</p>
          </div>
          <div className="w-px h-12 bg-noir/10 hidden sm:block" />
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-champagne mb-2">5</p>
            <p className="text-xs tracking-[0.2em] uppercase text-taupe">Years Experience</p>
          </div>
          <div className="w-px h-12 bg-noir/10 hidden sm:block" />
          <div className="text-center">
            <p className="font-serif text-4xl lg:text-5xl text-champagne mb-2">100%</p>
            <p className="text-xs tracking-[0.2em] uppercase text-taupe">With Love</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
