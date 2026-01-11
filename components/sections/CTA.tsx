"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 80, damping: 25 });
  const smoothTextY = useSpring(textY, { stiffness: 80, damping: 25 });

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: smoothBackgroundY }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1280&fit=crop&q=90"
          alt="Beautiful floral arrangement"
          className="w-full h-[120%] object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-noir/70" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
      </motion.div>

      {/* Art Deco decorations */}
      <div className="absolute top-12 left-12 w-32 h-32 border-l border-t border-champagne/20 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-32 h-32 border-r border-b border-champagne/20 hidden lg:block" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-24 h-24 border border-champagne/10 rotate-45"
        animate={{
          y: [-20, 20, -20],
          rotate: [45, 55, 45],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-16 h-16 border border-champagne/10 rotate-45"
        animate={{
          y: [20, -20, 20],
          rotate: [45, 35, 45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: smoothTextY }}
        className="container-luxe relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-champagne" />
            <span className="text-xs tracking-[0.3em] uppercase text-champagne">
              Begin Your Journey
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-champagne" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-ivory leading-tight mb-8"
          >
            Ready to Bring Your
            <span className="text-champagne italic"> Vision to Life?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-ivory/70 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl mx-auto"
          >
            Let&apos;s create something beautiful together. Whether it&apos;s your
            wedding day or simply brightening someone&apos;s day, we&apos;re here to help.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact" className="group">
              <button className="relative px-10 py-4 bg-champagne border border-champagne text-noir text-xs tracking-[0.15em] uppercase font-medium overflow-hidden transition-all duration-500 group-hover:text-ivory">
                <span className="absolute inset-0 bg-noir transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center justify-center gap-3">
                  Start Your Consultation
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </button>
            </Link>
            <Link href="/services" className="group">
              <button className="relative px-10 py-4 bg-transparent border border-ivory/30 text-ivory text-xs tracking-[0.15em] uppercase font-medium overflow-hidden transition-all duration-500 hover:border-champagne">
                <span className="relative">View Services</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
