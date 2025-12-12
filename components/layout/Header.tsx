"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { springConfig } from "@/lib/animations";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

// Mobile menu variants
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};

// Staggered nav link variants
const navLinkContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springConfig.snappy,
  },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll direction for hide/show
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Show/hide based on scroll direction
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    // Add background blur when scrolled
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isHidden ? -100 : 0,
      }}
      transition={springConfig.snappy}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm shadow-violet-100/50"
          : "bg-white/80 backdrop-blur-md"
      } border-b border-violet-100/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with hover effect */}
          <Link href="/" className="flex items-center group">
            <motion.span
              className="font-serif text-2xl md:text-3xl font-semibold text-violet-900 tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="inline-block transition-colors group-hover:text-violet-700">
                Violet
              </span>{" "}
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Hues
              </motion.span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-violet-800 hover:text-violet-600 transition-colors relative group py-2"
              >
                {link.label}
                {/* Animated underline from center */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-violet-600 transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="relative px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-full overflow-hidden group"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Book Consultation</span>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-violet-800 hover:text-violet-600 rounded-lg hover:bg-violet-50 transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-violet-100"
          >
            <motion.nav
              variants={navLinkContainerVariants}
              initial="hidden"
              animate="visible"
              className="px-4 py-4 space-y-2"
            >
              {navLinks.map((link, index) => (
                <motion.div key={link.href} variants={navLinkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 text-violet-800 hover:bg-violet-50 rounded-xl transition-all hover:translate-x-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={navLinkVariants}>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 bg-violet-600 text-white text-center rounded-full hover:bg-violet-700 transition-colors mt-4"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
