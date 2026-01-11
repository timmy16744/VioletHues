"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Personal Touch",
    description: "Every arrangement is crafted with attention to detail, ensuring your vision comes to life exactly as imagined.",
  },
  {
    number: "02",
    title: "Local Sourcing",
    description: "We prioritize working with local growers, bringing you the freshest blooms while supporting our community.",
  },
  {
    number: "03",
    title: "Seasonal Beauty",
    description: "Embracing nature's rhythm, we work with what each season offers, creating arrangements that feel authentic.",
  },
  {
    number: "04",
    title: "Family Values",
    description: "As a mother, I understand the importance of those special moments. I bring warmth and care to every creation.",
  },
];

const pillarVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.2 + i * 0.1,
    },
  }),
};

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const smoothImageY = useSpring(imageY, { stiffness: 80, damping: 25 });
  const smoothImageScale = useSpring(imageScale, { stiffness: 80, damping: 25 });
  const smoothTextY = useSpring(textY, { stiffness: 80, damping: 25 });

  return (
    <section ref={containerRef} className="section-luxe bg-noir relative overflow-hidden">
      {/* Subtle grain */}
      <div className="grain-overlay" style={{ opacity: 0.02 }} />

      {/* Art Deco corner elements */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-champagne/10 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-champagne/10 hidden lg:block" />

      <div className="container-luxe">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  y: smoothImageY,
                  scale: smoothImageScale,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=900&h=1125&fit=crop&q=90"
                  alt="Chiara arranging flowers in her studio"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/40 via-noir/10 to-transparent pointer-events-none" />

              {/* Corner frame */}
              <div className="absolute inset-4 border border-champagne/20 pointer-events-none" />
            </div>

            {/* Floating quote */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-4 lg:right-8 glass-dark-luxe px-8 py-6 max-w-xs"
            >
              <p className="font-serif text-lg text-ivory/90 italic leading-relaxed">
                "Flowers are more than decoration — they're expressions of emotion."
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-champagne mt-4">
                — Chiara
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            style={{ y: smoothTextY }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-champagne" />
                <span className="text-xs tracking-[0.3em] uppercase text-champagne">
                  Our Philosophy
                </span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-light text-ivory leading-tight mb-6">
                Flowers That Speak
                <span className="text-champagne italic"> From the Heart</span>
              </h2>
              <p className="text-ivory/60 text-lg leading-relaxed">
                We believe that flowers are more than just decorations – they're
                expressions of emotion, celebrations of life, and connections to nature.
                Every arrangement is infused with intention and care.
              </p>
            </motion.div>

            {/* Pillars */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  custom={index}
                  variants={pillarVariants}
                  className="group p-6 border border-ivory/5 hover:border-champagne/20 transition-colors duration-500"
                >
                  <span className="text-xs text-champagne/60 font-medium">
                    {pillar.number}
                  </span>
                  <h3 className="font-serif text-xl text-ivory mt-2 mb-3 group-hover:text-champagne transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-ivory/50 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
