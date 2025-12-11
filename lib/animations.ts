import { Variants, Transition } from "framer-motion";

// Spring configurations (Floraly-inspired)
export const springConfig = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 200, damping: 40 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 25 },
  smooth: { type: "spring" as const, stiffness: 100, damping: 30 },
};

// Easing functions (cubic-bezier)
export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeOutQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  easeInOutCubic: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springConfig.snappy,
    },
  },
};

// Fade in with scale
export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...springConfig.gentle,
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
      ...springConfig.snappy,
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
      ...springConfig.snappy,
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

// Text reveal (word by word)
export const textRevealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const textRevealChild: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      ...springConfig.snappy,
    },
  },
};

// Image reveal with clip path
export const imageReveal: Variants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
    scale: 1.2,
    opacity: 0,
  },
  visible: {
    clipPath: "circle(100% at 50% 50%)",
    scale: 1,
    opacity: 1,
    transition: {
      clipPath: { duration: 1.2, ease: easings.easeOutExpo },
      scale: { duration: 1.4, ease: easings.easeOutExpo },
      opacity: { duration: 0.4 },
    },
  },
};

// Image reveal from bottom
export const imageRevealUp: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    scale: 1.1,
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      clipPath: { duration: 1, ease: easings.easeOutExpo },
      scale: { duration: 1.2, ease: easings.easeOutExpo },
    },
  },
};

// Card hover with 3D tilt
export const cardHover3D = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 4px 20px rgba(147, 51, 234, 0.1)",
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.2)",
    transition: springConfig.snappy,
  },
};

// Button magnetic effect helper
export const magneticEffect = (x: number, y: number, strength: number = 0.3) => ({
  x: x * strength,
  y: y * strength,
});

// Float animation for decorative elements
export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Subtle pulse
export const pulseAnimation: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Shimmer effect for buttons/cards
export const shimmerAnimation = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

// Gradient shift animation
export const gradientShift: Variants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
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
      duration: 0.5,
      ease: easings.easeOutQuart,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Parallax helper
export const useParallax = (scrollY: number, speed: number = 0.5) => {
  return scrollY * speed;
};

// Scroll progress transition
export const scrollTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};

// Viewport animation options
export const viewportOnce = {
  once: true,
  amount: 0.3,
  margin: "-100px",
};

export const viewportRepeat = {
  once: false,
  amount: 0.3,
};

// Counter animation helper
export const counterAnimation = (from: number, to: number) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
});

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
