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
  color?: "violet" | "pink" | "white";
}

export default function FloatingPetals({
  count = 15,
  direction = "up",
  color = "violet",
}: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = [];
    for (let i = 0; i < count; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 10,
        rotation: Math.random() * 360,
      });
    }
    setPetals(newPetals);
  }, [count]);

  const colorClasses = {
    violet: "text-violet-300/40",
    pink: "text-pink-300/40",
    white: "text-white/30",
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
            opacity: [0, 1, 1, 0],
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
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 2C13.5 5 16 7.5 19 9C16 10.5 13.5 13 12 16C10.5 13 8 10.5 5 9C8 7.5 10.5 5 12 2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
