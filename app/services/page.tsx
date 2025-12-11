"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Calendar, Sparkles, Gift, MessageCircle, Truck, Check } from "lucide-react";
import Button from "@/components/ui/Button";

const services = [
  {
    id: "weddings",
    icon: Heart,
    title: "Wedding Florals",
    subtitle: "Your Perfect Day, Perfectly Bloomed",
    description: "From intimate garden ceremonies to grand ballroom celebrations, I create bespoke floral designs that capture the essence of your love story. Every petal is chosen with intention, every arrangement crafted with care.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
    features: [
      "Bridal bouquets & bridesmaid flowers",
      "Ceremony arch & aisle decorations",
      "Table centerpieces & reception styling",
      "Buttonholes & corsages",
      "Cake flowers & venue installations",
    ],
    pricing: "From $1,500",
    pricingNote: "Tailored to your vision and venue",
  },
  {
    id: "occasions",
    icon: Calendar,
    title: "Special Occasions",
    subtitle: "Celebrate Life's Beautiful Moments",
    description: "Birthdays, anniversaries, graduations, or any moment worth celebrating – I create arrangements that speak from the heart. Each design is thoughtfully crafted to match the personality and preferences of your recipient.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&h=600&fit=crop",
    features: [
      "Birthday bouquets & arrangements",
      "Anniversary flowers",
      "Graduation celebrations",
      "New baby welcomes",
      "Sympathy & memorial tributes",
    ],
    pricing: "From $75",
    pricingNote: "Delivery available within 20 miles",
  },
  {
    id: "everyday",
    icon: Sparkles,
    title: "Everyday Beauty",
    subtitle: "Bring Nature Home",
    description: "You don't need a special occasion to enjoy beautiful flowers. My seasonal bouquets bring the freshness and beauty of local blooms into your home or workspace, changing with the seasons to keep your space feeling alive and inspired.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
    features: [
      "Seasonal hand-tied bouquets",
      "Weekly fresh flower delivery",
      "Home styling arrangements",
      "Office & workspace flowers",
      "Custom vase arrangements",
    ],
    pricing: "From $45",
    pricingNote: "Weekly subscriptions available",
  },
  {
    id: "subscriptions",
    icon: Gift,
    title: "Flower Subscriptions",
    subtitle: "Fresh Blooms, Delivered Regularly",
    description: "The gift that keeps on giving – or a treat for yourself! Choose your frequency and let me surprise you with seasonal arrangements delivered fresh to your door. Perfect for flower lovers who want regular doses of natural beauty.",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=600&fit=crop",
    features: [
      "Weekly, fortnightly, or monthly options",
      "Seasonal flower selections",
      "Flexible delivery schedule",
      "Gift subscriptions available",
      "Pause or cancel anytime",
    ],
    pricing: "From $120/month",
    pricingNote: "First month 15% off",
  },
];

const process = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "We'll chat about your vision, preferences, and budget. Whether it's a quick call or an in-person meeting over tea, I want to understand exactly what you're dreaming of.",
    icon: MessageCircle,
  },
  {
    step: 2,
    title: "Design Proposal",
    description: "Based on our conversation, I'll create a detailed proposal with mood boards, flower suggestions, and pricing. We'll refine until it's perfect.",
    icon: Sparkles,
  },
  {
    step: 3,
    title: "Creation & Delivery",
    description: "Using the freshest seasonal blooms, I'll bring your vision to life. Everything is delivered with care, right when you need it.",
    icon: Truck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
              What I Offer
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-violet-950 leading-tight mb-6">
              Services Crafted With Love
            </h1>
            <p className="text-lg text-violet-700 max-w-2xl mx-auto">
              From weddings to everyday moments, I create floral designs that tell
              your unique story. Every arrangement is made with care, creativity,
              and the freshest seasonal blooms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-lavender"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-violet-200/30">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <span className="text-sm font-medium text-violet-600">
                    {service.subtitle}
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-4">
                  {service.title}
                </h2>

                <p className="text-violet-700 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                      <span className="text-violet-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-violet-50 rounded-xl mb-6">
                  <div>
                    <p className="font-serif text-2xl font-semibold text-violet-900">
                      {service.pricing}
                    </p>
                    <p className="text-sm text-violet-600">{service.pricingNote}</p>
                  </div>
                </div>

                <Link href="/contact">
                  <Button size="lg">Enquire About {service.title}</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-20 bg-violet-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              How It Works
            </h2>
            <p className="text-violet-300 max-w-2xl mx-auto">
              From first chat to final delivery, here&apos;s what you can expect when
              working with Violet Hues.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {process.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-violet-900/50 backdrop-blur-sm p-8 rounded-2xl border border-violet-800/50 h-full">
                  <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-violet-400 text-sm font-medium">
                    Step {step.step}
                  </span>
                  <h3 className="font-semibold text-white text-xl mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-violet-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {step.step < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-violet-700" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-4">
              Ready to Start?
            </h2>
            <p className="text-violet-700 mb-8 max-w-xl mx-auto">
              I&apos;d love to hear about your vision. Get in touch for a free
              consultation and let&apos;s create something beautiful together.
            </p>
            <Link href="/contact">
              <Button size="lg">Book Your Consultation</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
