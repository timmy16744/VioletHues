"use client";

import { HTMLAttributes, forwardRef, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "glass";
  tilt?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      tilt = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { stiffness: 300, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    // Glow position
    const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
    const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    };

    const baseStyles = "rounded-2xl overflow-hidden transition-shadow duration-300";

    const variants = {
      default: "bg-white",
      elevated: "bg-white shadow-lg shadow-violet-100/50 hover:shadow-xl hover:shadow-violet-200/50",
      bordered: "bg-white border border-violet-100 hover:border-violet-200",
      glass: "bg-white/70 backdrop-blur-lg border border-white/20",
    };

    const CardContent = tilt ? (
      <motion.div
        ref={cardRef}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        style={{
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          y: -8,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
        {...(props as any)}
      >
        {/* Glow effect */}
        {glow && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(147, 51, 234, 0.15), transparent 50%)`,
            }}
          />
        )}
        {children}
      </motion.div>
    ) : (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className} hover-lift`}
        {...props}
      >
        {children}
      </div>
    );

    return CardContent;
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`p-6 ${className}`} {...props}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`px-6 pb-6 ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  overlay?: boolean;
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className = "", src, alt, overlay = false, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div
        ref={ref}
        className={`relative aspect-[4/3] overflow-hidden ${className}`}
        {...props}
      >
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100 via-violet-50 to-violet-100 animate-pulse" />
        )}

        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.1,
          }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Optional gradient overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 via-transparent to-transparent pointer-events-none" />
        )}
      </div>
    );
  }
);
CardImage.displayName = "CardImage";

export default Card;
