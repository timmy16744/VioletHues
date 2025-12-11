"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-violet-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
              Bespoke Floral Design
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-violet-950 leading-tight mb-6">
              Where Every Bloom{" "}
              <span className="text-violet-600">Tells a Story</span>
            </h1>
            <p className="text-lg text-violet-700 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Personal floristry with a bespoke touch. I create unique, seasonally-inspired
              arrangements that capture the essence of your most precious moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Consultation
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/50">
              <img
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop"
                alt="Beautiful purple and violet flower arrangement"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -left-4 lg:-left-8 bottom-20 bg-white p-4 rounded-2xl shadow-xl"
            >
              <p className="text-sm font-medium text-violet-800">Crafted with Love</p>
              <p className="text-xs text-violet-500 mt-1">By Chiara</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
