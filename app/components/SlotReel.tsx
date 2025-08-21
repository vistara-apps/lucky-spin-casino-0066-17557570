'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SlotReelProps {
  symbol: string
  isSpinning: boolean
  delay?: number
  index?: number
}

export function SlotReel({ symbol, isSpinning, delay = 0, index = 0 }: SlotReelProps) {
  const [displaySymbol, setDisplaySymbol] = useState(symbol)
  const reelPosition = index + 1

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

  // Get symbol name for accessibility
  const getSymbolName = (symbol: string) => {
    const symbolNames: Record<string, string> = {
      '🍒': 'Cherry',
      '🍋': 'Lemon',
      '🍊': 'Orange',
      '🍇': 'Grapes',
      '🔔': 'Bell',
      '💎': 'Diamond',
      '7️⃣': 'Seven',
      '⭐': 'Star'
    }
    return symbolNames[symbol] || symbol
  }

  return (
    <motion.div
      className="slot-reel w-1/3 sm:w-auto"
      animate={isSpinning ? { 
        y: [0, -20, 0],
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 0.1,
        repeat: isSpinning ? Infinity : 0,
        ease: 'linear'
      }}
      aria-label={`Reel ${reelPosition}: ${isSpinning ? 'Spinning' : getSymbolName(displaySymbol)}`}
      role="img"
    >
      <motion.span
        key={displaySymbol}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-3xl sm:text-4xl"
        aria-hidden="true"
      >
        {displaySymbol}
      </motion.span>
    </motion.div>
  )
}
