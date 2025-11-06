'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorTrail() {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; y: number }>>([])
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    let petalId = 0
    let lastTime = Date.now()

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Throttle petal creation
      const now = Date.now()
      if (now - lastTime > 100) {
        lastTime = now
        const newPetal = { id: petalId++, x: e.clientX, y: e.clientY }
        setPetals((prev) => [...prev, newPetal])

        // Remove petal after animation
        setTimeout(() => {
          setPetals((prev) => prev.filter((p) => p.id !== newPetal.id))
        }, 2000)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-violet-500/50 backdrop-blur-sm border border-violet-400"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: -8,
          y: -8,
        }}
      />

      {/* Petal Trail */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-violet-400/60 to-pink-400/60 blur-sm"
          initial={{
            x: petal.x,
            y: petal.y,
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            y: petal.y + 50,
            x: petal.x + (Math.random() - 0.5) * 40,
            scale: 0,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
