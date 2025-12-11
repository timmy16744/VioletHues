"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRef } from "react";
import { springConfig } from "@/lib/animations";
import FloatingPetals from "@/components/decorative/FloatingPetals";

// Header text variants
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springConfig.snappy,
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
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

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springConfig.gentle}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{ y: smoothBackgroundY }}
          >
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900" />

            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-violet-500/50 via-transparent to-fuchsia-500/30"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Moving shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Floating orbs */}
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-fuchsia-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              x: [20, -20, 20],
              y: [20, -20, 20],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </motion.svg>
          </div>

          {/* Floating petals */}
          <FloatingPetals count={8} direction="up" color="white" />

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Decorative sparkle */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...springConfig.bouncy, delay: 0.1 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-violet-200" />
                </motion.div>
              </motion.div>

              <motion.h2
                variants={textVariants}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4"
              >
                Ready to Bring Your Vision to Life?
              </motion.h2>
              <motion.p
                variants={textVariants}
                className="text-violet-200 max-w-2xl mx-auto mb-8 text-lg"
              >
                Let&apos;s create something beautiful together. Whether it&apos;s your
                wedding day, a special celebration, or simply brightening someone&apos;s
                day, I&apos;m here to help.
              </motion.p>
            </motion.div>

            {/* Buttons with stagger */}
            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div variants={buttonVariants}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    magnetic
                    className="bg-white text-violet-700 hover:bg-violet-50 w-full sm:w-auto group shadow-lg shadow-violet-900/30"
                  >
                    Start Your Consultation
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    magnetic
                    className="border-white/50 text-white hover:bg-white/10 hover:border-white w-full sm:w-auto backdrop-blur-sm"
                  >
                    View Services
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom decorative line */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
