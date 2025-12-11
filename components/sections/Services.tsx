"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Calendar, Sparkles, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Services() {
  return (
    <section className="py-24 bg-lavender">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
            What I Offer
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-violet-950 mb-4">
            Services Crafted for You
          </h2>
          <p className="text-violet-700 max-w-2xl mx-auto">
            Every arrangement is thoughtfully designed to capture your vision and bring
            natural beauty into your most meaningful moments.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link href={service.href} className="group block h-full">
                <Card variant="elevated" className="h-full hover:shadow-xl hover:shadow-violet-200/50 transition-shadow duration-300">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl">
                      <service.icon className="w-5 h-5 text-violet-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-violet-900 mb-2 group-hover:text-violet-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-violet-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-violet-700 group-hover:text-violet-500">
                      Learn more
                      <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
