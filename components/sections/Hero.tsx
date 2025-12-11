"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import GradientOrbs from "@/components/decorative/GradientOrbs";
import {
  springConfig,
  fadeInUp,
  staggerContainer,
  imageReveal,
} from "@/lib/animations";

// Word animation variants
const wordVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -40,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      ...springConfig.snappy,
      delay: 0.4 + i * 0.1,
    },
  }),
};

// Badge animation
const badgeVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springConfig.bouncy,
      delay: 0.2,
    },
  },
};

// Button container variants
const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springConfig.bouncy,
  },
};

// Floating badge variants
const floatingBadgeVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      ...springConfig.snappy,
      delay: 1.4,
    },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const headingWords = ["Where", "Every", "Bloom"];
  const highlightWords = ["Tells", "a", "Story"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-gradient-hero pt-20 overflow-hidden"
    >
      {/* Animated background orbs */}
      <GradientOrbs variant="hero" />

      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            style={{ y: textY }}
            className="text-center lg:text-left"
          >
            {/* Animated badge */}
            <motion.span
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6 hover-scale cursor-default"
            >
              Bespoke Floral Design
            </motion.span>

            {/* Animated heading with word reveals */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-violet-950 leading-tight mb-6 perspective">
              <span className="block preserve-3d">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block text-violet-600 preserve-3d">
                {highlightWords.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i + headingWords.length}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Animated subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig.gentle, delay: 0.8 }}
              className="text-lg text-violet-700 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Personal floristry with a bespoke touch. I create unique, seasonally-inspired
              arrangements that capture the essence of your most precious moments.
            </motion.p>

            {/* Animated buttons */}
            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div variants={buttonVariants}>
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto group shimmer-overlay">
                    Book a Consultation
                    <ArrowRight
                      size={18}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Services
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image with advanced reveal */}
          <motion.div style={{ y: imageY }} className="relative">
            <motion.div
              variants={imageReveal}
              initial="hidden"
              animate="visible"
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/50"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop"
                alt="Beautiful purple and violet flower arrangement"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating badge with continuous animation */}
            <motion.div
              variants={floatingBadgeVariants}
              initial="hidden"
              animate="visible"
              className="absolute -left-4 lg:-left-8 bottom-20 bg-white p-4 rounded-2xl shadow-xl hover-lift"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="text-sm font-medium text-violet-800">Crafted with Love</p>
                <p className="text-xs text-violet-500 mt-1">By Chiara</p>
              </motion.div>
            </motion.div>

            {/* Decorative floating element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springConfig.bouncy, delay: 1.6 }}
              className="absolute -right-4 lg:-right-6 top-20 w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center shadow-lg animate-float-gentle"
            >
              <span className="text-white text-2xl">✿</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-violet-500 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-violet-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
