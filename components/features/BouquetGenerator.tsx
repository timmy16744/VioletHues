"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Download, RefreshCw, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { springConfig } from "@/lib/animations";
import GradientOrbs from "@/components/decorative/GradientOrbs";

const budgetOptions = [
  { value: "50", label: "$50" },
  { value: "100", label: "$100" },
  { value: "150", label: "$150" },
  { value: "200+", label: "$200+" },
];

const vibeOptions = [
  { value: "romantic", label: "Romantic" },
  { value: "modern", label: "Modern" },
  { value: "rustic", label: "Rustic" },
  { value: "elegant", label: "Elegant" },
  { value: "whimsical", label: "Whimsical" },
];

const colorOptions = [
  { value: "purple-violet", label: "Purple & Violet", color: "bg-violet-500" },
  { value: "pastels", label: "Soft Pastels", color: "bg-pink-200" },
  { value: "bold-bright", label: "Bold & Bright", color: "bg-orange-500" },
  { value: "white-green", label: "White & Green", color: "bg-emerald-200" },
  { value: "warm-tones", label: "Warm Tones", color: "bg-amber-400" },
];

const occasionOptions = [
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding", label: "Wedding" },
  { value: "sympathy", label: "Sympathy" },
  { value: "just-because", label: "Just Because" },
];

// Header animation variants
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig.snappy,
  },
};

// Option button component with morph animation
function OptionButton({
  selected,
  onClick,
  children,
  colorDot,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  colorDot?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors relative overflow-hidden ${
        selected
          ? "bg-violet-600 text-white"
          : "bg-violet-100 text-violet-700 hover:bg-violet-200"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
      transition={springConfig.snappy}
    >
      {/* Selection indicator */}
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mr-1.5"
            transition={springConfig.bouncy}
          >
            <Check size={14} />
          </motion.span>
        )}
      </AnimatePresence>

      {colorDot && (
        <motion.span
          className={`w-3 h-3 rounded-full ${colorDot} mr-2`}
          animate={{ scale: selected ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}

      {/* Shimmer effect on selection */}
      {selected && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      )}
    </motion.button>
  );
}

// Floating petal for loading animation
function FloatingPetal({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-4 h-4 text-violet-400"
      initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-20, -60],
        x: [0, Math.random() * 40 - 20],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C13.5 5 16 7.5 19 9C16 10.5 13.5 13 12 16C10.5 13 8 10.5 5 9C8 7.5 10.5 5 12 2Z" />
      </svg>
    </motion.div>
  );
}

export default function BouquetGenerator() {
  const [budget, setBudget] = useState("100");
  const [vibe, setVibe] = useState("romantic");
  const [colors, setColors] = useState("purple-violet");
  const [occasion, setOccasion] = useState("just-because");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setShowSuccess(false);

    try {
      const response = await fetch("/api/generate-bouquet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budget, vibe, colors, occasion }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate bouquet");
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `violet-hues-bouquet-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-violet-100 via-violet-50 to-lavender relative overflow-hidden">
      {/* Animated background orbs */}
      <GradientOrbs variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.span
            variants={textVariants}
            className="inline-flex items-center px-4 py-1.5 bg-violet-600 text-white text-sm font-medium rounded-full mb-4 hover-scale"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} className="mr-2" />
            </motion.span>
            AI-Powered
          </motion.span>
          <motion.h2
            variants={textVariants}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-violet-950 mb-4"
          >
            Design Your Dream Bouquet
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-violet-700 max-w-2xl mx-auto"
          >
            Let our AI help visualize your perfect arrangement. Select your preferences
            and see your dream bouquet come to life.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Options Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={springConfig.gentle}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-violet-200/30 hover:shadow-2xl hover:shadow-violet-200/40 transition-shadow duration-500"
          >
            {/* Budget Selection */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Budget Range
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((option) => (
                  <OptionButton
                    key={option.value}
                    selected={budget === option.value}
                    onClick={() => setBudget(option.value)}
                  >
                    {option.label}
                  </OptionButton>
                ))}
              </div>
            </motion.div>

            {/* Vibe Selection */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Vibe
              </label>
              <div className="flex flex-wrap gap-2">
                {vibeOptions.map((option) => (
                  <OptionButton
                    key={option.value}
                    selected={vibe === option.value}
                    onClick={() => setVibe(option.value)}
                  >
                    {option.label}
                  </OptionButton>
                ))}
              </div>
            </motion.div>

            {/* Color Selection */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Color Palette
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((option) => (
                  <OptionButton
                    key={option.value}
                    selected={colors === option.value}
                    onClick={() => setColors(option.value)}
                    colorDot={option.color}
                  >
                    {option.label}
                  </OptionButton>
                ))}
              </div>
            </motion.div>

            {/* Occasion Selection */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                {occasionOptions.map((option) => (
                  <OptionButton
                    key={option.value}
                    selected={occasion === option.value}
                    onClick={() => setOccasion(option.value)}
                  >
                    {option.label}
                  </OptionButton>
                ))}
              </div>
            </motion.div>

            {/* Generate Button with pulse effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={!isGenerating && !generatedImage ? {
                  boxShadow: [
                    "0 0 0 0 rgba(139, 92, 246, 0)",
                    "0 0 0 10px rgba(139, 92, 246, 0.1)",
                    "0 0 0 0 rgba(139, 92, 246, 0)",
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full"
              >
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  size="lg"
                  magnetic
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Creating Your Bouquet...
                    </>
                  ) : (
                    <>
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles size={18} className="mr-2" />
                      </motion.span>
                      Generate Bouquet
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-sm text-red-600 text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={springConfig.gentle}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-violet-200/30 hover:shadow-2xl hover:shadow-violet-200/40 transition-shadow duration-500"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center relative"
                  >
                    {/* Floating petals animation */}
                    {[...Array(6)].map((_, i) => (
                      <FloatingPetal key={i} delay={i * 0.3} />
                    ))}

                    <div className="w-20 h-20 mx-auto mb-4 relative">
                      {/* Outer ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-violet-200 border-t-violet-600"
                      />
                      {/* Inner ring */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-2 border-violet-100 border-b-violet-400"
                      />
                      {/* Center sparkle */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Sparkles className="w-8 h-8 text-violet-600" />
                      </motion.div>
                    </div>
                    <motion.p
                      className="text-violet-600 font-medium"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Creating magic...
                    </motion.p>
                    <p className="text-violet-400 text-sm mt-1">This may take a moment</p>
                  </motion.div>
                ) : generatedImage ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={generatedImage}
                      alt="AI Generated Bouquet"
                      className="w-full h-full object-cover"
                    />
                    {/* Success overlay */}
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-violet-600/80 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={springConfig.bouncy}
                            className="bg-white rounded-full p-4"
                          >
                            <Check className="w-12 h-12 text-violet-600" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-8"
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 bg-violet-100 rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(139, 92, 246, 0.2)",
                          "0 0 0 15px rgba(139, 92, 246, 0)",
                          "0 0 0 0 rgba(139, 92, 246, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Sparkles className="w-10 h-10 text-violet-400" />
                      </motion.div>
                    </motion.div>
                    <p className="text-violet-600 font-medium">Your bouquet preview</p>
                    <p className="text-violet-400 text-sm mt-1">
                      Select your preferences and generate
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={springConfig.snappy}
                  className="mt-6 flex gap-4"
                >
                  <Button
                    onClick={handleDownload}
                    variant="secondary"
                    magnetic
                    className="flex-1"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    variant="outline"
                    magnetic
                    className="flex-1"
                    disabled={isGenerating}
                  >
                    <motion.span
                      animate={isGenerating ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw size={16} className="mr-2" />
                    </motion.span>
                    Regenerate
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ ...springConfig.snappy, delay: 0.1 }}
                  className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-xl text-center border border-violet-100"
                >
                  <p className="text-violet-700 text-sm">
                    Love what you see?{" "}
                    <motion.a
                      href="/contact"
                      className="font-medium text-violet-600 underline hover:text-violet-800"
                      whileHover={{ scale: 1.05 }}
                    >
                      Contact us
                    </motion.a>{" "}
                    to bring this bouquet to life!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
