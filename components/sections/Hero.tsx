"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import Marquee from "@/components/decorative/Marquee";

const springConfig = {
  stiffness: 100,
  damping: 30,
  mass: 1,
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.1 + i * 0.1,
    },
  }),
};

const imageRevealVariants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    scale: 1.2,
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      clipPath: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 },
      scale: { duration: 2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 },
    },
  },
};

const floatingBadgeVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 1.2,
    },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-ivory overflow-hidden"
    >
      {/* Subtle grain overlay */}
      <div className="grain-overlay" />

      {/* Art Deco corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-champagne/30 hidden lg:block" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-champagne/30 hidden lg:block" />

      <motion.div
        style={{ opacity }}
        className="flex-1 flex items-center pt-32 pb-16 relative z-10"
      >
        <div className="container-luxe w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <motion.div
              style={{ y: textY }}
              className="relative z-20 order-2 lg:order-1"
            >
              {/* Elegant label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="deco-line" />
                <span className="text-xs tracking-[0.3em] uppercase text-taupe font-medium">
                  Bespoke Floral Atelier
                </span>
              </motion.div>

              {/* Main heading with split text reveal */}
              <div className="overflow-hidden mb-6">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-noir leading-[0.9] tracking-tight">
                  <motion.span
                    custom={0}
                    variants={revealVariants}
                    initial="hidden"
                    animate="visible"
                    className="block"
                  >
                    Where
                  </motion.span>
                  <motion.span
                    custom={1}
                    variants={revealVariants}
                    initial="hidden"
                    animate="visible"
                    className="block"
                  >
                    Nature
                  </motion.span>
                  <motion.span
                    custom={2}
                    variants={revealVariants}
                    initial="hidden"
                    animate="visible"
                    className="block text-champagne italic"
                  >
                    Becomes Art
                  </motion.span>
                </h1>
              </div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-taupe text-lg lg:text-xl max-w-md leading-relaxed mb-10"
              >
                An intimate floral atelier crafting bespoke arrangements
                for life&apos;s most precious moments.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact" className="group">
                  <button className="btn-luxe-filled w-full sm:w-auto group">
                    <span className="flex items-center gap-3">
                      Begin Your Journey
                      <ArrowDownRight
                        size={16}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                      />
                    </span>
                  </button>
                </Link>
                <Link href="/services" className="group">
                  <button className="btn-luxe w-full sm:w-auto">
                    <span>Explore Services</span>
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              style={{ y: imageY }}
              className="relative order-1 lg:order-2"
            >
              <motion.div
                variants={imageRevealVariants}
                initial="hidden"
                animate="visible"
                className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1000&h=1250&fit=crop&q=90"
                  alt="Elegant floral arrangement with soft violet and blush tones"
                  className="w-full h-full object-cover animate-ken-burns"
                />

                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir/20 via-transparent to-transparent pointer-events-none" />

                {/* Vignette effect */}
                <div className="image-vignette absolute inset-0" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                variants={floatingBadgeVariants}
                initial="hidden"
                animate="visible"
                className="absolute -right-4 lg:right-8 bottom-12 lg:bottom-24 glass-luxe px-6 py-4 hover-lift"
              >
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-champagne mb-1">
                    Crafted with Intention
                  </p>
                  <p className="font-serif text-lg text-noir italic">by Chiara</p>
                </motion.div>
              </motion.div>

              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-8 top-1/4 hidden lg:block"
              >
                <div className="w-16 h-16 border border-champagne/40 rotate-45 animate-float-elegant" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-taupe mb-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-champagne to-transparent"
        />
      </motion.div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-champagne/10 bg-ivory/80 backdrop-blur-sm">
        <Marquee />
      </div>
    </section>
  );
}
