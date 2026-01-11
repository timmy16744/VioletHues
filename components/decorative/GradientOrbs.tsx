"use client";

import { motion } from "framer-motion";

interface GradientOrbsProps {
  variant?: "hero" | "section" | "dark" | "subtle";
}

export default function GradientOrbs({ variant = "hero" }: GradientOrbsProps) {
  const orbConfigs = {
    hero: [
      {
        className: "w-[500px] h-[500px] bg-champagne/5 top-0 right-0 translate-x-1/3 -translate-y-1/4",
        delay: 0,
      },
      {
        className: "w-[400px] h-[400px] bg-blush/10 bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
        delay: 2,
      },
      {
        className: "w-[300px] h-[300px] bg-champagne/5 top-1/2 left-1/3",
        delay: 4,
      },
    ],
    section: [
      {
        className: "w-[400px] h-[400px] bg-champagne/5 top-0 right-1/4",
        delay: 0,
      },
      {
        className: "w-[300px] h-[300px] bg-blush/10 bottom-0 left-1/4",
        delay: 2,
      },
    ],
    dark: [
      {
        className: "w-[500px] h-[500px] bg-champagne/5 top-0 left-1/4",
        delay: 0,
      },
      {
        className: "w-[400px] h-[400px] bg-plum/10 bottom-0 right-1/4",
        delay: 3,
      },
    ],
    subtle: [
      {
        className: "w-[300px] h-[300px] bg-champagne/3 top-10 left-10",
        delay: 0,
      },
      {
        className: "w-[350px] h-[350px] bg-blush/5 bottom-10 right-10",
        delay: 3,
      },
    ],
  };

  const orbs = orbConfigs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 2,
            delay: orb.delay * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}
