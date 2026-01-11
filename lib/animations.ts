import { Variants, Transition } from "framer-motion";

// Luxe easing curves
export const easings = {
  luxe: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  expo: [0.87, 0, 0.13, 1] as [number, number, number, number],
};

// Spring configurations for different feels
export const springConfig = {
  gentle: { type: "spring" as const, stiffness: 80, damping: 25 },
  smooth: { type: "spring" as const, stiffness: 100, damping: 30 },
  snappy: { type: "spring" as const, stiffness: 200, damping: 35 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
};

// Fade in from bottom - luxe version
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easings.luxe,
    },
  },
};

// Fade in with scale
export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.luxe,
    },
  },
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: easings.luxe,
    },
  },
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: easings.luxe,
    },
  },
};

// Stagger container for children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Fast stagger for many items
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Text reveal with mask - luxe
export const textRevealMask: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    y: 20,
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: {
      duration: 1,
      ease: easings.luxe,
    },
  },
};

// Image reveal with clip path
export const imageReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    scale: 1.2,
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      clipPath: { duration: 1.4, ease: easings.luxe },
      scale: { duration: 2, ease: easings.luxe },
    },
  },
};

// Reveal from left
export const revealFromLeft: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 1.2,
      ease: easings.luxe,
    },
  },
};

// Card hover with subtle lift
export const cardHover = {
  rest: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.luxe,
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.5,
      ease: easings.luxe,
    },
  },
};

// Float animation for decorative elements
export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Subtle pulse
export const pulseAnimation: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Gradient flow animation
export const gradientFlow: Variants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.luxe,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
};

// Viewport animation options
export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "-100px",
};

export const viewportRepeat = {
  once: false,
  amount: 0.2,
};

// Stagger delays
export const staggerDelays = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
};

// Reduce motion check
export const shouldReduceMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Simplified variants for reduced motion
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

// Scroll-linked transform helper
export const scrollTransition: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 25,
  restDelta: 0.001,
};
