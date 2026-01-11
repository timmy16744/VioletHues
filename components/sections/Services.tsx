"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { MarqueeLarge } from "@/components/decorative/Marquee";

const services = [
  {
    number: "01",
    title: "Wedding Florals",
    description: "From intimate ceremonies to grand celebrations, we craft bespoke arrangements that reflect your unique love story. Every petal, every stem, chosen with intention.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop&q=90",
    href: "/services#weddings",
  },
  {
    number: "02",
    title: "Special Occasions",
    description: "Birthdays, anniversaries, or moments that deserve celebration. We transform ordinary days into extraordinary memories through the language of flowers.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&h=1000&fit=crop&q=90",
    href: "/services#occasions",
  },
  {
    number: "03",
    title: "Everyday Beauty",
    description: "Bring nature's elegance into your daily life. Seasonal bouquets that tell the story of the moment, delivered with care to your doorstep.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=1000&fit=crop&q=90",
    href: "/services#everyday",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.1 + i * 0.15,
    },
  }),
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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
      className="perspective"
    >
      <Link href={service.href} className="block group">
        <motion.div
          ref={cardRef}
          className="relative bg-ivory border border-noir/5 overflow-hidden preserve-3d"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            y: -8,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Image container */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-noir/20"
              animate={{
                opacity: isHovered ? 0.4 : 0.2,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Number badge */}
            <div className="absolute top-6 left-6 w-12 h-12 border border-ivory/30 rotate-45 flex items-center justify-center bg-ivory/10 backdrop-blur-sm">
              <span className="font-serif text-lg text-ivory -rotate-45">
                {service.number}
              </span>
            </div>

            {/* Arrow indicator */}
            <motion.div
              className="absolute bottom-6 right-6"
              animate={{
                x: isHovered ? 0 : -10,
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center">
                <ArrowUpRight size={20} className="text-noir" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8">
            <motion.h3
              className="font-serif text-2xl lg:text-3xl font-light text-noir mb-3"
              animate={{
                color: isHovered ? "#C9A962" : "#0A0A0A",
              }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>
            <p className="text-taupe text-sm leading-relaxed">
              {service.description}
            </p>

            {/* Animated underline */}
            <div className="mt-6 pt-6 border-t border-noir/5">
              <span className="text-xs tracking-[0.2em] uppercase text-noir/60 group-hover:text-champagne transition-colors duration-300 flex items-center gap-2">
                Discover More
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight size={12} />
                </motion.span>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="section-luxe bg-ivory relative overflow-hidden">
      {/* Background marquee */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
        <MarqueeLarge text="Artisan Florals" direction="left" />
      </div>

      <div className="container-luxe relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="deco-line" />
            <span className="text-xs tracking-[0.3em] uppercase text-taupe">
              Our Services
            </span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-light text-noir leading-tight mb-6">
            Crafted for
            <span className="text-champagne italic"> Your Moments</span>
          </h2>
          <p className="text-taupe text-lg leading-relaxed">
            Every arrangement is thoughtfully designed to capture your vision,
            bringing natural beauty into life's most meaningful celebrations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 lg:mt-24 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-champagne" />
            <div className="deco-diamond" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-champagne" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
