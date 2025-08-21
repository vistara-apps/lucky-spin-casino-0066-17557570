'use client'

import { motion } from 'framer-motion'

interface SpinButtonProps {
  onClick: () => void
  disabled?: boolean
  isSpinning?: boolean
}

export function SpinButton({ onClick, disabled, isSpinning }: SpinButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isSpinning}
      className={`btn-primary w-full text-base sm:text-lg py-3 sm:py-4 ${
        isSpinning ? 'animate-pulse' : ''
      } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      aria-label={isSpinning ? "Spinning in progress" : "Spin the slot machine"}
      aria-disabled={disabled || isSpinning}
    >
      {isSpinning ? (
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full"
            aria-hidden="true"
          />
          <span>Spinning...</span>
        </div>
      ) : (
        <span>SPIN TO WIN! <span aria-hidden="true">🎰</span></span>
      )}
    </motion.button>
  )
}
