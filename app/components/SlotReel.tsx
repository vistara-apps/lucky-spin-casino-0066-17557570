
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SlotReelProps {
  symbol: string
  isSpinning: boolean
  delay?: number
}

export function SlotReel({ symbol, isSpinning, delay = 0 }: SlotReelProps) {
  const [displaySymbol, setDisplaySymbol] = useState(symbol)

  useEffect(() => {
    if (isSpinning) {
      // Simulate spinning by rapidly changing symbols
      const interval = setInterval(() => {
        const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '⭐']
        setDisplaySymbol(symbols[Math.floor(Math.random() * symbols.length)])
      }, 100)

      // Stop spinning after delay and show final symbol
      setTimeout(() => {
        clearInterval(interval)
        setDisplaySymbol(symbol)
      }, 1000 + delay)

      return () => clearInterval(interval)
    } else {
      setDisplaySymbol(symbol)
    }
  }, [isSpinning, symbol, delay])

  return (
    <motion.div
      className="slot-reel"
      animate={isSpinning ? { 
        y: [0, -20, 0],
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 0.1,
        repeat: isSpinning ? Infinity : 0,
        ease: 'linear'
      }}
    >
      <motion.span
        key={displaySymbol}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-4xl"
      >
        {displaySymbol}
      </motion.span>
    </motion.div>
  )
}
