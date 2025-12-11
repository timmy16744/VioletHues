"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { springConfig, fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: Heart,
    title: "Wedding Florals",
    description: "From intimate ceremonies to grand celebrations, I craft bespoke arrangements that reflect your unique love story.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
    href: "/services#weddings",
  },
  {
    icon: Calendar,
    title: "Special Occasions",
    description: "Birthdays, anniversaries, or just because - every moment deserves flowers that speak from the heart.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=400&fit=crop",
    href: "/services#occasions",
  },
  {
    icon: Sparkles,
    title: "Everyday Beauty",
    description: "Bring nature's elegance into your home with stunning seasonal bouquets delivered to your door.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop",
    href: "/services#everyday",
  },
];

// Enhanced card variants with spring physics
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springConfig.snappy,
      delay: 0.1 + i * 0.15,
    },
  }),
};

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig.snappy,
  },
};

// Service card with 3D tilt effect
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springCfg = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springCfg);

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

  const Icon = service.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="h-full perspective"
    >
      <Link href={service.href} className="block h-full">
        <motion.div
          ref={cardRef}
          className="h-full bg-white rounded-2xl overflow-hidden shadow-lg shadow-violet-100/50 preserve-3d"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            y: -12,
            boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
            transition: springConfig.snappy,
          }}
        >
          {/* Glow effect overlay */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10 opacity-60"
              style={{
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(147, 51, 234, 0.15), transparent 50%)`,
              }}
            />
          )}

          {/* Image container with zoom effect */}
          <div className="relative aspect-[3/2] overflow-hidden">
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-violet-900/30 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon badge with pulse animation */}
            <motion.div
              className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-5 h-5 text-violet-600" />
            </motion.div>
          </div>

          {/* Content section */}
          <div className="p-6 relative">
            <motion.h3
              className="font-serif text-xl font-semibold text-violet-900 mb-2"
              animate={{ color: isHovered ? "#7c3aed" : "#4c1d95" }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>
            <p className="text-violet-600 text-sm leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Learn more link with animated arrow */}
            <motion.span
              className="inline-flex items-center text-sm font-medium text-violet-700"
              animate={{ color: isHovered ? "#8b5cf6" : "#6d28d9" }}
            >
              Learn more
              <motion.span
                animate={{ x: isHovered ? 6 : 0 }}
                transition={springConfig.snappy}
              >
                <ArrowRight size={16} className="ml-1" />
              </motion.span>
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="py-24 bg-lavender relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl animate-drift" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl animate-drift" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with staggered animation */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={textVariants}
            className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4 hover-scale"
          >
            What I Offer
          </motion.span>
          <motion.h2
            variants={textVariants}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-violet-950 mb-4"
          >
            Services Crafted for You
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-violet-700 max-w-2xl mx-auto"
          >
            Every arrangement is thoughtfully designed to capture your vision and bring
            natural beauty into your most meaningful moments.
          </motion.p>
        </motion.div>

        {/* Services Grid with staggered entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
