'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FLOWER_OPTIONS,
  COLOR_PALETTES,
  ARRANGEMENT_STYLES,
  SIZES,
  BOUQUET_SHAPES,
  PRESET_BOUQUETS,
  type BouquetConfig,
  type RecipeItem,
} from '@/lib/constants'
import {
  generateBouquetImage,
  generateBouquetRecipe,
  analyzeBouquetImage,
} from '@/lib/geminiService'

export function AIAtelier() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [config, setConfig] = useState<BouquetConfig>({
    flowers: [FLOWER_OPTIONS[0].id],
    customFlowers: '',
    colorPalette: COLOR_PALETTES[0].id,
    customColorPalette: '',
    customColors: [],
    arrangementStyle: ARRANGEMENT_STYLES[0].id,
    customArrangementStyle: '',
    size: SIZES[1],
    shape: BOUQUET_SHAPES[0],
    customShape: '',
    negativePrompt: '',
    extras: '',
  })
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<RecipeItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async (newConfig: BouquetConfig) => {
    setIsLoadingImage(true)
    setIsLoadingRecipe(true)
    setGeneratedImageUrl(null)
    setRecipe(null)
    setError(null)

    let imageUrl: string | null = null

    try {
      imageUrl = await generateBouquetImage(newConfig)
      setGeneratedImageUrl(imageUrl)
    } catch (err) {
      console.error(err)
      setError('Failed to generate bouquet image. Please try again.')
    } finally {
      setIsLoadingImage(false)
    }

    if (imageUrl) {
      try {
        if (newConfig.flowers.length > 0 || newConfig.customFlowers) {
          const recipeData = await generateBouquetRecipe(newConfig, imageUrl)
          setRecipe(recipeData)
        } else {
          setRecipe([])
        }
      } catch (err) {
        console.error(err)
        setRecipe([])
      } finally {
        setIsLoadingRecipe(false)
      }
    } else {
      setIsLoadingRecipe(false)
      setRecipe([])
    }
  }, [])

  const handleQuickCreate = () => {
    setIsExpanded(true)
    handleGenerate(config)
  }

  const handleSurpriseMe = () => {
    const getRandomItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
    const shuffledFlowers = [...FLOWER_OPTIONS].sort(() => 0.5 - Math.random())
    const numFlowersToPick = Math.floor(Math.random() * 4) + 2
    const randomFlowerIds = shuffledFlowers.slice(0, numFlowersToPick).map((f) => f.id)

    const randomConfig: BouquetConfig = {
      flowers: randomFlowerIds,
      colorPalette: getRandomItem(COLOR_PALETTES).id,
      arrangementStyle: getRandomItem(ARRANGEMENT_STYLES).id,
      size: getRandomItem(SIZES),
      shape: getRandomItem(BOUQUET_SHAPES),
      customFlowers: '',
      customColorPalette: '',
      customColors: [],
      customArrangementStyle: '',
      customShape: '',
      negativePrompt: '',
      extras: '',
    }

    setConfig(randomConfig)
    setIsExpanded(true)
    handleGenerate(randomConfig)
  }

  const handleFlowerChange = (flowerId: string) => {
    setConfig((prev) => {
      const newFlowers = prev.flowers.includes(flowerId)
        ? prev.flowers.filter((f) => f !== flowerId)
        : [...prev.flowers, flowerId]
      return { ...prev, flowers: newFlowers }
    })
  }

  const totalCost =
    recipe?.reduce((acc, item) => {
      const price = parseFloat(item.pricePerStem.replace(/[^0-9.]/g, ''))
      if (!isNaN(price) && isFinite(price)) {
        return acc + price * item.quantity
      }
      return acc
    }, 0) || 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value)
  }

  return (
    <section id="ai-atelier" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            See It. Design It. Get It.
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-3">
            Design your dream bouquet with our custom tool and we&apos;ll handcraft the exact arrangement you see on screen.
          </p>
          <p className="text-base font-semibold text-sage-700 max-w-xl mx-auto mb-8">
            What you create is what you receive — guaranteed.
          </p>

          {!isExpanded && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleQuickCreate}
                className="btn-primary hover:bg-stone-800 transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Your Bouquet
              </motion.button>
              <motion.button
                onClick={handleSurpriseMe}
                className="px-8 py-3 bg-white border-2 border-stone-900 text-stone-900 text-sm uppercase tracking-wider font-semibold hover:bg-stone-50 transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Surprise Me
              </motion.button>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Configuration Panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-cream-50 rounded-lg p-8 space-y-6 max-h-[800px] overflow-y-auto border border-stone-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-2xl text-stone-900">Customize</h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-3">Quick Start</label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_BOUQUETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setConfig((prev) => ({ ...prev, ...preset.config }))
                        }}
                        className="px-4 py-2 bg-white border border-stone-200 text-stone-700 text-sm hover:border-stone-400 transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flowers */}
                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-3">Choose Flowers</label>
                  <div className="flex flex-wrap gap-2">
                    {FLOWER_OPTIONS.map((flower) => (
                      <button
                        key={flower.id}
                        onClick={() => handleFlowerChange(flower.id)}
                        className={`px-4 py-2 text-sm transition-all ${
                          config.flowers.includes(flower.id)
                            ? 'bg-stone-900 text-cream-50 border border-stone-900'
                            : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {flower.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-3">Color Palette</label>
                  <div className="grid grid-cols-1 gap-2">
                    {COLOR_PALETTES.map((palette) => (
                      <button
                        key={palette.id}
                        onClick={() => setConfig({ ...config, colorPalette: palette.id })}
                        className={`p-3 rounded border transition-all text-left ${
                          config.colorPalette === palette.id
                            ? 'border-stone-900 bg-white'
                            : 'border-stone-200 bg-white hover:border-stone-400'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-stone-900">{palette.name}</span>
                          <div className="flex gap-1">
                            {palette.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full border border-stone-200"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size and Style */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">Size</label>
                    <select
                      value={config.size}
                      onChange={(e) => setConfig({ ...config, size: e.target.value })}
                      className="w-full px-4 py-3 rounded border border-stone-200 focus:border-stone-900 focus:outline-none bg-white text-stone-900"
                    >
                      {SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">Shape</label>
                    <select
                      value={config.shape}
                      onChange={(e) => setConfig({ ...config, shape: e.target.value })}
                      className="w-full px-4 py-3 rounded border border-stone-200 focus:border-stone-900 focus:outline-none bg-white text-stone-900"
                    >
                      {BOUQUET_SHAPES.map((shape) => (
                        <option key={shape} value={shape}>
                          {shape}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={() => handleGenerate(config)}
                  disabled={isLoadingImage || (config.flowers.length === 0 && !config.customFlowers)}
                  className="w-full btn-primary hover:bg-stone-800 transition-colors duration-300 disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoadingImage ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Bouquet'
                  )}
                </button>

                <button
                  onClick={handleSurpriseMe}
                  disabled={isLoadingImage}
                  className="w-full px-8 py-3 bg-white border-2 border-stone-900 text-stone-900 text-sm uppercase tracking-wider font-semibold hover:bg-stone-50 transition-colors disabled:opacity-50"
                >
                  Surprise Me
                </button>
              </motion.div>

              {/* Preview Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Image */}
                <div className="bg-cream-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center border border-stone-200">
                  {isLoadingImage ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-stone-700 font-serif text-lg">Creating your bouquet...</p>
                    </div>
                  ) : generatedImageUrl ? (
                    <div className="relative w-full group">
                      <img
                        src={generatedImageUrl}
                        alt="Generated bouquet"
                        className="w-full rounded shadow-lg"
                      />
                      <a
                        href={generatedImageUrl}
                        download="violet-hues-bouquet.jpg"
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
                      >
                        <span className="px-6 py-3 bg-white text-stone-900 font-semibold text-sm uppercase tracking-wider">
                          Download
                        </span>
                      </a>
                    </div>
                  ) : (
                    <div className="text-center text-stone-400">
                      <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="font-serif text-lg text-stone-600">Your bouquet will appear here</p>
                    </div>
                  )}
                </div>

                {/* Recipe */}
                {(recipe || isLoadingRecipe) && (
                  <div className="bg-white rounded-lg p-8 border border-stone-200">
                    <h4 className="font-serif text-2xl text-stone-900 mb-4">Bouquet Recipe</h4>
                    {isLoadingRecipe ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 bg-stone-100 rounded animate-pulse" />
                        ))}
                      </div>
                    ) : recipe && recipe.length > 0 ? (
                      <>
                        <div className="space-y-3 mb-6">
                          {recipe.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-stone-200">
                              <span className="font-medium text-stone-900">{item.name}</span>
                              <div className="text-right">
                                <span className="text-stone-600">{item.quantity}× </span>
                                <span className="text-stone-900 font-semibold">{item.pricePerStem}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t-2 border-stone-300">
                          <span className="font-serif text-lg font-bold text-stone-900">Total Cost</span>
                          <span className="font-serif text-2xl font-bold text-stone-900">{formatCurrency(totalCost)}</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-3">*Estimated wholesale prices (AUD)</p>
                      </>
                    ) : null}
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
                    {error}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
