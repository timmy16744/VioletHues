"use client";

import { forwardRef, useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      magnetic = false,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

    const baseStyles =
      "relative inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-500";

    const variants = {
      primary:
        "bg-champagne text-noir border border-champagne hover:bg-transparent hover:text-champagne",
      secondary:
        "bg-noir text-ivory border border-noir hover:bg-transparent hover:text-noir",
      outline:
        "border border-noir text-noir hover:bg-noir hover:text-ivory",
      ghost: "text-noir hover:text-champagne",
    };

    const sizes = {
      sm: "px-5 py-2 text-xs tracking-[0.1em] uppercase",
      md: "px-7 py-3 text-xs tracking-[0.1em] uppercase",
      lg: "px-10 py-4 text-xs tracking-[0.15em] uppercase",
    };

    // Handle magnetic effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const button = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMagneticPosition({ x: x * 0.15, y: y * 0.15 });
      }
    };

    const handleMouseLeave = () => {
      setMagneticPosition({ x: 0, y: 0 });
    };

    return (
      <motion.button
        ref={buttonRef}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          x: magneticPosition.x,
          y: magneticPosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />

        {/* Button content */}
        <span className="relative z-10 flex items-center">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
