"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-violet-200 max-w-2xl mx-auto mb-8 text-lg">
              Let&apos;s create something beautiful together. Whether it&apos;s your
              wedding day, a special celebration, or simply brightening someone&apos;s
              day, I&apos;m here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-violet-700 hover:bg-violet-50 w-full sm:w-auto"
                >
                  Start Your Consultation
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
