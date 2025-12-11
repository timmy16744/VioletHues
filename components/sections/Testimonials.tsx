"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useRef, useState } from "react";
import { springConfig } from "@/lib/animations";

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

// Header variants with stagger
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig.snappy,
  },
};

// Card entrance with 3D flip
const cardVariants = {
  hidden: {
    opacity: 0,
    rotateY: -30,
    scale: 0.9,
    y: 40,
  },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    scale: 1,
    y: 0,
    transition: {
      ...springConfig.snappy,
      delay: 0.2 + i * 0.15,
    },
  }),
};

// Quote icon animation
const quoteVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      ...springConfig.bouncy,
      delay: 0.4,
    },
  },
};

// Star fill animation
const starVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      ...springConfig.bouncy,
      delay: 0.6 + i * 0.1,
    },
  }),
};

// Testimonial card with 3D effects
function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics
  const springCfg = { stiffness: 400, damping: 35 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg);

  // Glow position
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springCfg);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springCfg);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="perspective h-full"
      onViewportEnter={() => setIsVisible(true)}
    >
      <motion.div
        ref={cardRef}
        className="h-full bg-violet-900/50 backdrop-blur-sm p-8 rounded-3xl border border-violet-800/50 preserve-3d relative overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          borderColor: isHovered ? "rgba(167, 139, 250, 0.5)" : "rgba(109, 40, 217, 0.3)",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
            : "0 10px 30px -10px rgba(139, 92, 246, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(167, 139, 250, 0.15), transparent 50%)`,
            }}
          />
        )}

        {/* Quote icon with scale animation */}
        <motion.div
          variants={quoteVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Quote className="w-10 h-10 text-violet-500 mb-4" />
        </motion.div>

        <p className="text-violet-100 leading-relaxed mb-6 relative z-10">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            {/* Avatar with ring pulse */}
            <motion.div
              className="relative"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={springConfig.snappy}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-violet-500"
              />
              {/* Pulse ring on hover */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-violet-400"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div>
              <motion.p
                className="font-medium text-white"
                animate={{ color: isHovered ? "#e9d5ff" : "#ffffff" }}
              >
                {testimonial.name}
              </motion.p>
              <p className="text-sm text-violet-400">{testimonial.occasion}</p>
            </div>
          </div>

          {/* Stars with sequential fill */}
          <div className="flex space-x-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={starVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    rotate: isHovered ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                  }}
                >
                  <Star className="w-4 h-4 fill-violet-400 text-violet-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-violet-950 relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-violet-800/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-700/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Additional floating orbs */}
        <motion.div
          className="absolute top-1/2 right-10 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with stagger */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={textVariants}
            className="inline-block px-4 py-1.5 bg-violet-800 text-violet-200 text-sm font-medium rounded-full mb-4 hover-scale"
          >
            Kind Words
          </motion.span>
          <motion.h2
            variants={textVariants}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4"
          >
            What My Clients Say
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-violet-300 max-w-2xl mx-auto"
          >
            It&apos;s an honour to be part of your special moments. Here&apos;s what some
            of my wonderful clients have shared.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
