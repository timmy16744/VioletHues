"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Sparkles, Sun } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Philosophy() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=1000&fit=crop"
                alt="Chiara arranging flowers in her studio"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-violet-100 rounded-3xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
                My Philosophy
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-4">
                Flowers That Come From the Heart
              </h2>
              <p className="text-violet-700 leading-relaxed">
                I believe that flowers are more than just decorations – they&apos;re
                expressions of emotion, celebrations of life, and connections to nature.
                Every arrangement I create is infused with intention and care.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={itemVariants}
                  className="p-5 bg-lavender rounded-2xl"
                >
                  <div className="w-10 h-10 bg-violet-200 rounded-xl flex items-center justify-center mb-3">
                    <pillar.icon className="w-5 h-5 text-violet-700" />
                  </div>
                  <h3 className="font-semibold text-violet-900 mb-1">{pillar.title}</h3>
                  <p className="text-sm text-violet-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
