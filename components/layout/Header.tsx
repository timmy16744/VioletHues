"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const navLinkVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.1 + i * 0.08,
    },
  }),
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden && !isMenuOpen ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-luxe shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-luxe">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-50 group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                {/* Logo mark */}
                <div className="w-10 h-10 border border-champagne/50 rotate-45 flex items-center justify-center group-hover:border-champagne transition-colors duration-500">
                  <span className="font-serif text-lg text-champagne -rotate-45">V</span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-serif text-xl lg:text-2xl font-light text-noir tracking-wide">
                    Violet{" "}
                    <span className="text-champagne italic">Hues</span>
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative py-2"
                >
                  <span className="text-sm tracking-[0.15em] uppercase text-noir/80 group-hover:text-noir transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-champagne transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link href="/contact" className="group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-luxe-filled text-xs"
                >
                  <span className="flex items-center gap-2">
                    Book Consultation
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-50 p-2 text-noir"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-6 h-px bg-current origin-center"
                />
                <motion.span
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="block w-6 h-px bg-current my-1"
                />
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? 0 : 4,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-6 h-px bg-current origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 lg:hidden bg-ivory"
          >
            {/* Art Deco decorations */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-champagne/20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-champagne/20" />

            <nav className="h-full flex flex-col justify-center items-center px-8">
              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center group"
                    >
                      <span className="font-serif text-4xl sm:text-5xl font-light text-noir group-hover:text-champagne transition-colors duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-luxe-filled"
                >
                  <span className="flex items-center gap-2">
                    Book Consultation
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute bottom-12 left-0 right-0 text-center"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-taupe mb-2">
                  Get in Touch
                </p>
                <a
                  href="mailto:hello@violethues.com"
                  className="text-sm text-noir hover:text-champagne transition-colors"
                >
                  hello@violethues.com
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
