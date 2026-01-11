"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

interface FloatingPetalsProps {
  count?: number;
  direction?: "up" | "down";
  color?: "champagne" | "blush" | "ivory";
}

export default function FloatingPetals({
  count = 12,
  direction = "up",
  color = "champagne",
}: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = [];
    for (let i = 0; i < count; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 16 + 8,
        duration: Math.random() * 12 + 18,
        delay: Math.random() * 12,
        rotation: Math.random() * 360,
      });
    }
    setPetals(newPetals);
  }, [count]);

  const colorClasses = {
    champagne: "text-champagne/20",
    blush: "text-blush/25",
    ivory: "text-ivory/15",
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={`absolute ${colorClasses[color]}`}
          initial={{
            x: `${petal.x}%`,
            y: direction === "up" ? "110%" : "-10%",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: direction === "up" ? "-10%" : "110%",
            rotate: petal.rotation + 360,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: petal.size,
            height: petal.size,
          }}
        >
          {/* Diamond shape for Art Deco feel */}
          <div className="w-full h-full bg-current rotate-45" />
        </motion.div>
      ))}
    </div>
  );
}
