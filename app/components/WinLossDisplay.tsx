'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { SlotResult } from '../types'

interface WinLossDisplayProps {
  result: SlotResult | null
  payout: number
}

export function WinLossDisplay({ result, payout }: WinLossDisplayProps) {
  if (!result) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        className={`card text-center ${
          result.isWin ? 'border-primary bg-primary/10' : 'border-red-500/50 bg-red-500/10'
        }`}
        role="alert"
        aria-live="assertive"
      >
        {result.isWin ? (
          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-3xl sm:text-4xl"
              aria-hidden="true"
            >
              🎉
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary">YOU WIN!</h3>
            <p className="text-base sm:text-lg">
              Multiplier: <span className="text-primary font-bold">{result.multiplier}x</span>
            </p>
            <p className="text-lg sm:text-xl font-bold">
              Payout: <span className="text-primary">{payout} credits</span>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-3xl sm:text-4xl"
              aria-hidden="true"
            >
              😢
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-red-400">Try Again!</h3>
            <p className="text-sm sm:text-base text-muted">Better luck next spin!</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
