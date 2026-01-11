"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Marquee from "@/components/decorative/Marquee";

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#weddings", label: "Wedding Florals" },
    { href: "/services#occasions", label: "Special Occasions" },
    { href: "/services#everyday", label: "Everyday Bouquets" },
    { href: "/services#subscriptions", label: "Subscriptions" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-noir text-ivory relative overflow-hidden">
      {/* Top Marquee */}
      <div className="border-b border-ivory/5">
        <Marquee speed="slow" />
      </div>

      {/* Main Footer Content */}
      <div className="container-luxe py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-champagne/50 rotate-45 flex items-center justify-center">
                  <span className="font-serif text-lg text-champagne -rotate-45">V</span>
                </div>
                <span className="font-serif text-2xl font-light text-ivory tracking-wide">
                  Violet <span className="text-champagne italic">Hues</span>
                </span>
              </div>
            </Link>
            <p className="text-ivory/50 text-sm leading-relaxed max-w-md mb-8">
              An intimate floral atelier crafting bespoke arrangements with love and intention.
              Bringing nature's beauty into your most precious moments.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-ivory/10 flex items-center justify-center hover:border-champagne/50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-ivory/60" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/60 hover:text-ivory text-sm transition-colors duration-300 hover-underline-elegant inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/60 hover:text-ivory text-sm transition-colors duration-300 hover-underline-elegant inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin size={16} className="flex-shrink-0 mt-1 text-champagne/60" />
                <span className="text-ivory/60 text-sm">
                  123 Blossom Lane<br />Meadowbrook, MB 12345
                </span>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 text-ivory/60 hover:text-ivory text-sm transition-colors duration-300"
                >
                  <Phone size={16} className="flex-shrink-0 text-champagne/60" />
                  <span>(123) 456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@violethues.com"
                  className="flex items-center gap-4 text-ivory/60 hover:text-ivory text-sm transition-colors duration-300"
                >
                  <Mail size={16} className="flex-shrink-0 text-champagne/60" />
                  <span>hello@violethues.com</span>
                </a>
              </li>
            </ul>

            {/* CTA */}
            <Link href="/contact" className="group inline-block mt-8">
              <span className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-champagne hover:text-ivory transition-colors duration-300">
                Book a Consultation
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/5">
        <div className="container-luxe py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory/40 text-xs tracking-wide">
              &copy; {new Date().getFullYear()} Violet Hues. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/privacy"
                className="text-ivory/40 hover:text-ivory/60 text-xs transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-ivory/40 hover:text-ivory/60 text-xs transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-12 right-12 w-20 h-20 border-r border-t border-champagne/5 hidden lg:block" />
      <div className="absolute bottom-24 left-12 w-20 h-20 border-l border-b border-champagne/5 hidden lg:block" />
    </footer>
  );
}
