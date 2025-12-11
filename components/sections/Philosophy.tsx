"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Leaf, Heart, Sparkles, Sun } from "lucide-react";
import { useRef, useState } from "react";
import { springConfig } from "@/lib/animations";

const pillars = [
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Every arrangement is crafted with personal attention to detail, ensuring your vision comes to life exactly as you imagined.",
  },
  {
    icon: Leaf,
    title: "Local Sourcing",
    description: "I prioritize working with local growers, bringing you the freshest blooms while supporting our community and the environment.",
  },
  {
    icon: Sun,
    title: "Seasonal Beauty",
    description: "Embracing nature's rhythm, I work with what each season offers, creating arrangements that feel authentic and alive.",
  },
  {
    icon: Sparkles,
    title: "Family Values",
    description: "As a mother, I understand the importance of those special moments. I bring warmth and care to every creation.",
  },
];

// Text reveal with mask animation
const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
    transition: {
      ...springConfig.snappy,
      clipPath: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Pillar card variants with hover lift
const pillarVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springConfig.snappy,
      delay: 0.3 + i * 0.1,
    },
  }),
};

// Pillar card component with hover effects
function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = pillar.icon;

  return (
    <motion.div
      custom={index}
      variants={pillarVariants}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="p-5 bg-lavender rounded-2xl border border-transparent cursor-default h-full"
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? "0 20px 40px -10px rgba(139, 92, 246, 0.2)"
            : "0 0px 0px 0px rgba(139, 92, 246, 0)",
          borderColor: isHovered ? "rgba(167, 139, 250, 0.3)" : "transparent",
        }}
        transition={springConfig.snappy}
      >
        {/* Icon container with pulse effect */}
        <motion.div
          className="w-10 h-10 bg-violet-200 rounded-xl flex items-center justify-center mb-3"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            backgroundColor: isHovered ? "#c4b5fd" : "#ddd6fe",
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-violet-700" />
          </motion.div>
        </motion.div>

        <motion.h3
          className="font-semibold text-violet-900 mb-1"
          animate={{ color: isHovered ? "#7c3aed" : "#4c1d95" }}
          transition={{ duration: 0.2 }}
        >
          {pillar.title}
        </motion.h3>
        <p className="text-sm text-violet-600 leading-relaxed">
          {pillar.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Image moves slower than scroll (parallax effect)
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Smoothed values with spring physics
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });
  const smoothImageScale = useSpring(imageScale, { stiffness: 100, damping: 30 });
  const smoothDecorY = useSpring(decorY, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-violet-50 rounded-full blur-3xl"
          style={{ y: smoothDecorY }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl"
          style={{ y: smoothDecorY }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springConfig.gentle}
            className="relative"
          >
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/30"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=1000&fit=crop"
                alt="Chiara arranging flowers in her studio"
                className="w-full h-full object-cover"
                style={{
                  y: smoothImageY,
                  scale: smoothImageScale,
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 via-transparent to-violet-900/5 pointer-events-none" />
            </div>

            {/* Decorative element with parallax */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-violet-100 rounded-3xl -z-10"
              style={{ y: smoothDecorY }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...springConfig.bouncy, delay: 0.3 }}
            />

            {/* Floating accent */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-violet-500/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Content Side */}
          <div>
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-10"
            >
              <motion.span
                variants={textRevealVariants}
                className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4 hover-scale"
              >
                My Philosophy
              </motion.span>
              <motion.h2
                variants={textRevealVariants}
                className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-4"
              >
                Flowers That Come From the Heart
              </motion.h2>
              <motion.p
                variants={textRevealVariants}
                className="text-violet-700 leading-relaxed"
              >
                I believe that flowers are more than just decorations – they&apos;re
                expressions of emotion, celebrations of life, and connections to nature.
                Every arrangement I create is infused with intention and care.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {pillars.map((pillar, index) => (
                <PillarCard key={pillar.title} pillar={pillar} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
