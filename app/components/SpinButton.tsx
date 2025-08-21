
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
      className={`btn-primary w-full text-lg py-4 ${
        isSpinning ? 'animate-pulse-glow' : ''
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {isSpinning ? (
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
          />
          Spinning...
        </div>
      ) : (
        'SPIN TO WIN! 🎰'
      )}
    </motion.button>
  )
}
