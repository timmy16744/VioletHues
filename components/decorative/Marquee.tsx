"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  className?: string;
}

const marqueeItems = [
  "Bespoke Arrangements",
  "Wedding Florals",
  "Special Occasions",
  "Seasonal Beauty",
  "Handcrafted with Love",
  "Local Sourcing",
  "Artisan Design",
  "Intimate Celebrations",
];

export default function Marquee({
  speed = "normal",
  direction = "left",
  className = "",
}: MarqueeProps) {
  const speedClass = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee",
  };

  const animationClass = direction === "right"
    ? "animate-marquee-reverse"
    : speedClass[speed];

  return (
    <div className={`marquee-container py-4 ${className}`}>
      <div className={`marquee-content ${animationClass}`}>
        {/* First set */}
        <span className="flex items-center">
          {marqueeItems.map((item, index) => (
            <span key={`first-${index}`} className="flex items-center">
              <span className="text-xs tracking-[0.25em] uppercase text-taupe font-medium whitespace-nowrap">
                {item}
              </span>
              <span className="mx-8 w-1.5 h-1.5 bg-champagne rotate-45" />
            </span>
          ))}
        </span>
        {/* Duplicate for seamless loop */}
        <span className="flex items-center">
          {marqueeItems.map((item, index) => (
            <span key={`second-${index}`} className="flex items-center">
              <span className="text-xs tracking-[0.25em] uppercase text-taupe font-medium whitespace-nowrap">
                {item}
              </span>
              <span className="mx-8 w-1.5 h-1.5 bg-champagne rotate-45" />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

// Large text marquee variant
export function MarqueeLarge({
  text = "Violet Hues",
  speed = "slow",
  direction = "left",
  className = "",
}: {
  text?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  className?: string;
}) {
  const animationClass = direction === "right"
    ? "animate-marquee-reverse"
    : speed === "slow"
    ? "animate-marquee-slow"
    : "animate-marquee";

  const items = Array(6).fill(text);

  return (
    <div className={`marquee-container overflow-hidden ${className}`}>
      <div className={`marquee-content ${animationClass}`}>
        <span className="flex items-center">
          {items.map((item, index) => (
            <span key={`first-${index}`} className="flex items-center">
              <span className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-noir/5 whitespace-nowrap px-8">
                {item}
              </span>
              <span className="w-4 h-4 border border-champagne/20 rotate-45 mx-4" />
            </span>
          ))}
        </span>
        <span className="flex items-center">
          {items.map((item, index) => (
            <span key={`second-${index}`} className="flex items-center">
              <span className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-noir/5 whitespace-nowrap px-8">
                {item}
              </span>
              <span className="w-4 h-4 border border-champagne/20 rotate-45 mx-4" />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
