"use client";

import { ButtonHTMLAttributes, forwardRef, useRef, useState } from "react";
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
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

    const baseStyles =
      "relative inline-flex items-center justify-center font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
      primary:
        "bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:from-violet-700 hover:to-violet-800 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
      secondary:
        "bg-violet-100 text-violet-900 hover:bg-violet-200 shadow-sm hover:shadow-md",
      outline:
        "border-2 border-violet-600 text-violet-600 hover:bg-violet-50 hover:border-violet-700",
      ghost: "text-violet-600 hover:bg-violet-50",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    // Handle ripple effect on click
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);
      }
    };

    // Handle magnetic effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const button = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMagneticPosition({ x: x * 0.2, y: y * 0.2 });
      }
    };

    const handleMouseLeave = () => {
      setMagneticPosition({ x: 0, y: 0 });
    };

    return (
      <motion.button
        ref={buttonRef}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={handleClick}
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
          stiffness: 400,
          damping: 25,
        }}
        {...props}
      >
        {/* Shimmer overlay for primary variant */}
        {variant === "primary" && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        )}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_linear]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Button content */}
        <span className="relative z-10 flex items-center">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
