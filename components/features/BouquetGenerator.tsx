"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Download, RefreshCw, Check } from "lucide-react";

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
  { value: "purple-violet", label: "Purple & Violet", color: "bg-plum" },
  { value: "pastels", label: "Soft Pastels", color: "bg-blush" },
  { value: "bold-bright", label: "Bold & Bright", color: "bg-rose" },
  { value: "white-green", label: "White & Green", color: "bg-sage" },
  { value: "warm-tones", label: "Warm Tones", color: "bg-champagne" },
];

const occasionOptions = [
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding", label: "Wedding" },
  { value: "sympathy", label: "Sympathy" },
  { value: "just-because", label: "Just Because" },
];

// Option button component with luxe styling
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
      className={`flex items-center px-4 py-2.5 text-xs tracking-wide uppercase font-medium transition-all duration-300 relative overflow-hidden border ${
        selected
          ? "bg-champagne text-noir border-champagne"
          : "bg-transparent text-taupe border-noir/10 hover:border-champagne/50 hover:text-noir"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mr-1.5"
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Check size={12} />
          </motion.span>
        )}
      </AnimatePresence>

      {colorDot && (
        <motion.span
          className={`w-2.5 h-2.5 rounded-full ${colorDot} mr-2`}
          animate={{ scale: selected ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}
    </motion.button>
  );
}

// Floating diamond for loading animation
function FloatingDiamond({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-3 h-3 bg-champagne/40"
      style={{ transform: "rotate(45deg)" }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-20, -60],
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
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
    <section className="section-luxe bg-ivory-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201, 169, 98, 0.1) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Art Deco corners */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-champagne/20 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-champagne/20 hidden lg:block" />

      <div className="container-luxe relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-champagne" />
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-champagne">
              <Sparkles size={14} />
              AI-Powered
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-champagne" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-light text-noir leading-tight mb-6">
            Design Your
            <span className="text-champagne italic"> Dream Bouquet</span>
          </h2>
          <p className="text-taupe text-lg max-w-2xl mx-auto leading-relaxed">
            Let our AI help visualize your perfect arrangement. Select your preferences
            and see your dream bouquet come to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Options Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="bg-ivory p-8 lg:p-10 border border-noir/5 relative"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-champagne/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-champagne/30" />

            {/* Budget Selection */}
            <div className="mb-8">
              <label className="block text-xs tracking-[0.2em] uppercase text-taupe mb-4">
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
            </div>

            {/* Vibe Selection */}
            <div className="mb-8">
              <label className="block text-xs tracking-[0.2em] uppercase text-taupe mb-4">
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
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-xs tracking-[0.2em] uppercase text-taupe mb-4">
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
            </div>

            {/* Occasion Selection */}
            <div className="mb-10">
              <label className="block text-xs tracking-[0.2em] uppercase text-taupe mb-4">
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
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full relative px-8 py-4 bg-champagne border border-champagne text-noir text-xs tracking-[0.15em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-noir hover:text-ivory hover:border-noir disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="relative flex items-center justify-center gap-3">
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating Your Bouquet...
                  </>
                ) : (
                  <>
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={16} />
                    </motion.span>
                    Generate Bouquet
                  </>
                )}
              </span>
            </motion.button>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-sm text-rose text-center"
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
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="bg-ivory p-8 lg:p-10 border border-noir/5 relative"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-champagne/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-champagne/30" />

            <div className="aspect-square overflow-hidden bg-ivory-dark flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center relative"
                  >
                    {/* Floating diamonds animation */}
                    {[...Array(6)].map((_, i) => (
                      <FloatingDiamond key={i} delay={i * 0.3} />
                    ))}

                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      {/* Outer ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-champagne/30"
                        style={{ transform: "rotate(45deg)" }}
                      />
                      {/* Inner ring */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-3 border border-champagne/50"
                        style={{ transform: "rotate(45deg)" }}
                      />
                      {/* Center sparkle */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 text-champagne" />
                      </motion.div>
                    </div>
                    <motion.p
                      className="text-noir font-serif text-lg italic"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Creating magic...
                    </motion.p>
                    <p className="text-taupe text-xs tracking-wide uppercase mt-2">
                      This may take a moment
                    </p>
                  </motion.div>
                ) : generatedImage ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
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
                          className="absolute inset-0 bg-champagne/90 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-ivory p-4"
                          >
                            <Check className="w-10 h-10 text-champagne" />
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
                      className="w-20 h-20 mx-auto mb-6 border border-champagne/30 flex items-center justify-center"
                      style={{ transform: "rotate(45deg)" }}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div
                        style={{ transform: "rotate(-45deg)" }}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Sparkles className="w-8 h-8 text-champagne/60" />
                      </motion.div>
                    </motion.div>
                    <p className="text-noir font-serif text-lg italic">Your bouquet preview</p>
                    <p className="text-taupe text-xs tracking-wide uppercase mt-2">
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
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                  className="mt-6 flex gap-4"
                >
                  <button
                    onClick={handleDownload}
                    className="flex-1 px-6 py-3 border border-noir/20 text-noir text-xs tracking-[0.1em] uppercase font-medium hover:border-champagne hover:text-champagne transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    Download
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1 px-6 py-3 border border-noir/20 text-noir text-xs tracking-[0.1em] uppercase font-medium hover:border-champagne hover:text-champagne transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <motion.span
                      animate={isGenerating ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw size={14} />
                    </motion.span>
                    Regenerate
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                  className="mt-6 p-5 bg-ivory-dark text-center border border-champagne/10"
                >
                  <p className="text-taupe text-sm">
                    Love what you see?{" "}
                    <a
                      href="/contact"
                      className="text-champagne hover:text-champagne-dark underline underline-offset-4 transition-colors"
                    >
                      Contact us
                    </a>{" "}
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
