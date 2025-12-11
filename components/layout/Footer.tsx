import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Chiara" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#weddings", label: "Wedding Flowers" },
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
    <footer className="bg-violet-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold text-white">
                Violet Hues
              </span>
            </Link>
            <p className="mt-4 text-violet-200 text-sm leading-relaxed">
              Bespoke floral arrangements crafted with love and care.
              Bringing nature&apos;s beauty into your special moments.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-violet-800 rounded-full hover:bg-violet-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-violet-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-violet-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-violet-200 text-sm">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>123 Blossom Lane<br />Meadowbrook, MB 12345</span>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-3 text-violet-200 hover:text-white text-sm transition-colors"
                >
                  <Phone size={18} className="flex-shrink-0" />
                  <span>(123) 456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@violethues.com"
                  className="flex items-center space-x-3 text-violet-200 hover:text-white text-sm transition-colors"
                >
                  <Mail size={18} className="flex-shrink-0" />
                  <span>hello@violethues.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-violet-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-violet-300 text-sm">
              &copy; {new Date().getFullYear()} Violet Hues. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-violet-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-violet-300 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
