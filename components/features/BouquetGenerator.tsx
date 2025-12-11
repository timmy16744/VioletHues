"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Download, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

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

export default function BouquetGenerator() {
  const [budget, setBudget] = useState("100");
  const [vibe, setVibe] = useState("romantic");
  const [colors, setColors] = useState("purple-violet");
  const [occasion, setOccasion] = useState("just-because");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

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
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-violet-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-300/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-1.5 bg-violet-600 text-white text-sm font-medium rounded-full mb-4">
            <Sparkles size={16} className="mr-2" />
            AI-Powered
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-violet-950 mb-4">
            Design Your Dream Bouquet
          </h2>
          <p className="text-violet-700 max-w-2xl mx-auto">
            Let our AI help visualize your perfect arrangement. Select your preferences
            and see your dream bouquet come to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Options Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-violet-200/30"
          >
            {/* Budget Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Budget Range
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBudget(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      budget === option.value
                        ? "bg-violet-600 text-white"
                        : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Vibe
              </label>
              <div className="flex flex-wrap gap-2">
                {vibeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setVibe(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      vibe === option.value
                        ? "bg-violet-600 text-white"
                        : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Color Palette
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setColors(option.value)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      colors === option.value
                        ? "bg-violet-600 text-white"
                        : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${option.color} mr-2`} />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-violet-800 mb-3">
                Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                {occasionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setOccasion(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      occasion === option.value
                        ? "bg-violet-600 text-white"
                        : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Creating Your Bouquet...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="mr-2" />
                  Generate Bouquet
                </>
              )}
            </Button>

            {error && (
              <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
            )}
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-violet-200/30"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-violet-50 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full border-4 border-violet-200 border-t-violet-600"
                      />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-violet-600" />
                    </div>
                    <p className="text-violet-600 font-medium">Creating magic...</p>
                    <p className="text-violet-400 text-sm mt-1">This may take a moment</p>
                  </motion.div>
                ) : generatedImage ? (
                  <motion.img
                    key="image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    src={generatedImage}
                    alt="AI Generated Bouquet"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-8"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-violet-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-violet-400" />
                    </div>
                    <p className="text-violet-600 font-medium">Your bouquet preview</p>
                    <p className="text-violet-400 text-sm mt-1">
                      Select your preferences and generate
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {generatedImage && (
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={handleDownload}
                  variant="secondary"
                  className="flex-1"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
                <Button
                  onClick={handleGenerate}
                  variant="outline"
                  className="flex-1"
                  disabled={isGenerating}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Regenerate
                </Button>
              </div>
            )}

            {generatedImage && (
              <div className="mt-6 p-4 bg-violet-50 rounded-xl text-center">
                <p className="text-violet-700 text-sm">
                  Love what you see?{" "}
                  <a href="/contact" className="font-medium text-violet-600 underline">
                    Contact us
                  </a>{" "}
                  to bring this bouquet to life!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
