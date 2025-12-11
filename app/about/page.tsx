"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Sparkles, Sun, Award } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Every arrangement is crafted with personal attention to detail, ensuring your vision comes to life exactly as you imagined.",
  },
  {
    icon: Leaf,
    title: "Local Sourcing",
    description: "I prioritize working with local growers, bringing you the freshest blooms while supporting our community and reducing our environmental footprint.",
  },
  {
    icon: Sun,
    title: "Seasonal Beauty",
    description: "Embracing nature's rhythm, I work with what each season offers, creating arrangements that feel authentic, alive, and perfectly timed.",
  },
  {
    icon: Sparkles,
    title: "Family Values",
    description: "As Arthur's mum, I understand the importance of those special moments. I bring warmth, care, and maternal intuition to every creation.",
  },
];

const favoriteFlowers = [
  {
    name: "Lisianthus",
    description: "Delicate ruffled petals that bring elegant softness to any arrangement",
    image: "https://images.unsplash.com/photo-1589393922695-6c1f6a6aa1bc?w=400&h=400&fit=crop",
  },
  {
    name: "Ranunculus",
    description: "Layer upon layer of paper-thin petals in the most beautiful shades",
    image: "https://images.unsplash.com/photo-1518882605630-8eb724780be2?w=400&h=400&fit=crop",
  },
  {
    name: "Peonies",
    description: "Lush, romantic blooms that embody timeless elegance and grace",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
  },
  {
    name: "Sweet Peas",
    description: "Fragrant, whimsical flowers that add movement and scent to designs",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
  },
  {
    name: "Dahlias",
    description: "Bold, sculptural blooms that make a stunning statement piece",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop",
  },
  {
    name: "Hellebores",
    description: "Elegant winter roses that bring magic to the colder months",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=400&fit=crop",
  },
];

const awards = [
  {
    year: "2024",
    title: "Best Local Florist",
    organization: "Meadowbrook Business Awards",
  },
  {
    year: "2023",
    title: "Customer Choice Award",
    organization: "Local Wedding Guide",
  },
  {
    year: "2023",
    title: "Sustainable Business Recognition",
    organization: "Green Business Network",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
                My Story
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-violet-950 leading-tight mb-6">
                My Floral Journey
              </h1>
              <p className="text-lg text-violet-700 leading-relaxed">
                Flowers are nature&apos;s poetry, and every bloom reminds us of life&apos;s
                beauty and hope. Welcome to my world of petals and possibilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/50">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop&crop=face"
                  alt="Chiara - Founder of Violet Hues"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg prose-violet mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-8 text-center">
              Hello, I&apos;m Chiara
            </h2>

            <div className="space-y-6 text-violet-700 leading-relaxed">
              <p>
                My love affair with flowers began in my grandmother&apos;s garden, where
                I spent countless summer afternoons surrounded by roses, lavender, and
                the gentle hum of bees. Those precious memories planted the seeds of a
                lifelong passion that would eventually blossom into Violet Hues.
              </p>

              <p>
                When my son Arthur was born, everything changed. Becoming a mother
                transformed how I see the world – suddenly, every moment felt more
                precious, every celebration more meaningful. I wanted to create
                something that would bring that same sense of wonder and joy to others.
              </p>

              <p>
                What started as arranging flowers for friends&apos; birthdays and local
                community events has grown into a bespoke floral studio where I pour my
                heart into every creation. I believe that flowers have the power to
                express what words sometimes cannot – love, gratitude, sympathy, joy,
                and hope.
              </p>

              <p>
                Today, I work from my sun-filled studio, carefully selecting each stem
                from local growers I&apos;ve built relationships with over the years.
                Whether it&apos;s a bridal bouquet, a birthday surprise, or a simple
                &ldquo;thinking of you&rdquo; arrangement, I approach every order with
                the same care I would for my own family.
              </p>

              <p>
                Arthur often joins me in the studio after school, learning to appreciate
                the beauty of nature just as I did at his age. He&apos;s become quite the
                little flower expert – his favourite are the sunflowers, though he
                assures me it&apos;s definitely not because they&apos;re as tall as he
                wants to be!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-20 bg-lavender">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-4">
              What I Stand For
            </h2>
            <p className="text-violet-700 max-w-2xl mx-auto">
              These principles guide everything I do, from selecting flowers to
              delivering them to your door.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="bg-white p-6 rounded-2xl shadow-lg shadow-violet-100/50"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <pillar.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-violet-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-violet-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Favorite Flowers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-4">
              My Favourite Flowers
            </h2>
            <p className="text-violet-700 max-w-2xl mx-auto">
              Every florist has their treasured blooms. Here are the ones that make
              my heart sing.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {favoriteFlowers.map((flower) => (
              <motion.div
                key={flower.name}
                variants={itemVariants}
                className="group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-violet-900 mb-1">
                  {flower.name}
                </h3>
                <p className="text-violet-600 text-sm">{flower.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-violet-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Recognition
            </h2>
            <p className="text-violet-300 max-w-2xl mx-auto">
              I&apos;m humbled by the recognition from our community and industry.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {awards.map((award) => (
              <motion.div
                key={award.title}
                variants={itemVariants}
                className="bg-violet-900/50 backdrop-blur-sm p-8 rounded-2xl border border-violet-800/50 text-center"
              >
                <Award className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                <p className="text-violet-400 text-sm mb-2">{award.year}</p>
                <h3 className="font-semibold text-white text-lg mb-1">{award.title}</h3>
                <p className="text-violet-300 text-sm">{award.organization}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
